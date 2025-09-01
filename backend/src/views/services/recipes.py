from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.extensions import db
from src.views.models import Recipe, User
import openai
import os
from datetime import datetime


openai.api_key = os.getenv("OPENAI_API_KEY")

recipes_bp = Blueprint("recipes", __name__)

@recipes_bp.route("/generate", methods=["POST"])
@jwt_required()
def generate_recipes():
    current_user_id = get_jwt_identity()  
    data = request.get_json()
    ingredients = data.get("ingredients")

    if not ingredients or not isinstance(ingredients, list):
        return jsonify({"error": "Ingredients required as a list"}), 400

    ingredient_str = ", ".join(ingredients)
    prompt = f"""
    Suggest 3 simple recipes using these ingredients: {ingredient_str}.
    Return JSON array with fields: title, instructions, estimated_time (in mins). 
    """

    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        gpt_text = response.choices[0].message.content

        import json
        try:
            recipes = json.loads(gpt_text)
        except:
            recipes = []
            for r in gpt_text.split("\n\n"):
                lines = r.split(". ")
                if len(lines) >= 2:
                    recipes.append({
                        "title": lines[0].strip(),
                        "instructions": ". ".join(lines[1:]).strip(),
                        "estimated_time": 30
                    })

        saved_recipes = []
        for r in recipes:
            recipe = Recipe(
                title=r.get("title"),
                ingredients=ingredient_str,
                instructions=r.get("instructions"),
                estimated_time=r.get("estimated_time", 30),
                user_id=current_user_id
            )
            db.session.add(recipe)
            saved_recipes.append(recipe)

        db.session.commit()

        return jsonify([{
            "id": r.id,
            "title": r.title,
            "ingredients": r.ingredients,
            "instructions": r.instructions,
            "estimated_time": r.estimated_time
        } for r in saved_recipes]), 201

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    
@recipes_bp.route("/my-recipes", methods=["GET"])
@jwt_required()
def my_recipes():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    recipes = Recipe.query.filter_by(user_id=current_user_id).all()
    
    return jsonify([{
        "id": r.id,
        "title": r.title,
        "ingredients": r.ingredients,
        "instructions": r.instructions,
        "estimated_time": r.estimated_time,
        "is_favorite": r in user.favourites 
    } for r in recipes])


@recipes_bp.route("/favourite/<int:recipe_id>", methods=["POST"])
@jwt_required()
def favourite(recipe_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404

    if recipe in user.favourites:
        user.favourites.remove(recipe)
        action = "removed"
    else:
        user.favourites.append(recipe)
        action = "added"

    db.session.commit()
    return jsonify({"status": "success", "action": action})


@recipes_bp.route("/delete/<int:recipe_id>", methods=["DELETE"])
@jwt_required()
def delete_recipe(recipe_id):
    current_user_id = get_jwt_identity()
    recipe = Recipe.query.filter_by(id=recipe_id, user_id=current_user_id).first()
    
    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404

    db.session.delete(recipe)
    db.session.commit()
    return jsonify({"status": "success", "message": "Recipe deleted"}), 200