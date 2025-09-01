from decouple import config
from flask_login import LoginManager
from src.extensions import db, bcrypt, migrate, app
from .views.models import User
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.views.users.logout_user import token_blacklist



app.config.from_object(config('APP_SETTINGS'))
db.init_app(app)
bcrypt.init_app(app)
migrate.init_app(app, db)
CORS(app, origins=['http://localhost:5173'], supports_credentials=True)
app.config["JWT_SECRET_KEY"] = config('JWT_SECRET_KEY')
jwt = JWTManager(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login.login'
login_manager.login_message_category = 'danger'

def check_if_token_revoked(jwt_header, jwt_payload):
    return jwt_payload["jti"] in token_blacklist

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

from src.views.users.login_user import login_bp
from src.views.users.register_user import register_bp
from src.views.users.logout_user import logout_bp
from src.views.users.update_user import update_user_bp
from src.views.services.recipes import recipes_bp

app.register_blueprint(register_bp)
app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(update_user_bp)
app.register_blueprint(recipes_bp)