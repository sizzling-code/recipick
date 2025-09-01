from flask import Blueprint, jsonify, request
from flask_login import login_user
from src.views.models import User
from src import db, bcrypt
from src.views.responses import missing_fields, invalid_credentials, success_login

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
    
    login_user(user)
    return jsonify(success_login), 200