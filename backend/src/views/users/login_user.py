from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from src.views.models import User
from src import db, bcrypt
from src.views.responses import missing_fields, invalid_credentials

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not all(key in data for key in ('email', 'password')):
        return jsonify(missing_fields), 400
    
    email = data['email']
    password = data['password']
    
    user = User.query.filter_by(email=email).first()
    
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify(invalid_credentials), 401
    
    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "username": user.username,
            "email": user.email
        }
    )
    
    return jsonify({
        "message": "Login successful",
        "access_token": access_token
    }), 200


@login_bp.route('/user-profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()  
    claims = get_jwt() 
    return jsonify(user={
        "id": int(user_id),
        "username": claims.get("username"),
        "email": claims.get("email")
    }), 200


@login_bp.route('/user-home', methods=['GET'])
@jwt_required()
def home():
    user_id = get_jwt_identity()  
    claims = get_jwt() 
    return jsonify(user={
        "id": int(user_id),
        "username": claims.get("username"),
        "email": claims.get("email")
    }), 200
