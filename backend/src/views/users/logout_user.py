from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from src.views.responses import success_logout

logout_bp = Blueprint('logout', __name__)

token_blacklist = set()

@logout_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    
    token_blacklist.add(jti)
    
    return jsonify(success_logout), 200
