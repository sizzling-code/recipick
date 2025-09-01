from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask

app = Flask(__name__)
bcrypt = Bcrypt()
db = SQLAlchemy()
migrate = Migrate()