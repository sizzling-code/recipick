from flask import Blueprint, jsonify, request
from flask_login import login_user
from src.views.models import User
from src import db, bcrypt
from src.views.responses import (
    missing_fields,
    user_exists,
    success_register
)

register_bp = Blueprint('auth', __name__)

@register_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or not all(key in data for key in ('username', 'email', 'password')):
        return jsonify(missing_fields), 400

    username = data['username']
    email = data['email']
    password = data['password']

    existing_user = User.query.filter((User.email == email) | (User.username == username)).first()
    if existing_user:
        return jsonify(user_exists), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(success_register), 201