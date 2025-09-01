from flask import Blueprint, jsonify, request
from src.views.models import User
from src import db, bcrypt
from flask_login import login_required
from src.views.responses import missing_fields, user_not_found, success_update

update_user_bp = Blueprint('update-user', __name__)

@login_required
@update_user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    if not data:
        return jsonify(missing_fields), 400
    
    user = User.query.get(user_id)
    if not user:
        return jsonify(user_not_found), 404
    
    if "username" in data:    
        user.username = data['username']
        
    if 'password' in data:
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user.password = hashed_password

        
    try:
        db.session.commit()
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
    return jsonify(success_update), 200