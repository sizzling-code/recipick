from flask import Blueprint, jsonify, request
from src.views.models import User
from src import db, bcrypt
from src.views.responses import (
    missing_fields,
    user_exists,
    success_register
)
from flask_jwt_extended import create_access_token

register_bp = Blueprint('auth', __name__)

@register_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()


    if not data or not all(key in data for key in ('username', 'email', 'password')):
        return jsonify(missing_fields), 400

    username = data['username']
    email = data['email']
    password = data['password']

    existing_user = User.query.filter(
        (User.email == email) | (User.username == username)
    ).first()
    if existing_user:
        return jsonify(user_exists), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')


    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "message": success_register["message"],
        "access_token": access_token,
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email
        }
    }), 201
    