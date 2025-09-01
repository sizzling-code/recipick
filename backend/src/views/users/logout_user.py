from flask import Blueprint, jsonify
from flask_login import logout_user, login_required
from src.views.responses import success_logout

logout_bp = Blueprint('logout', __name__)

@logout_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify(success_logout), 200