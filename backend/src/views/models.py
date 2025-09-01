from datetime import datetime
from flask_login import UserMixin
from src.extensions import db, app


class User(UserMixin, db.Model):    
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    created_on = db.Column(db.DateTime, nullable=False)


    recipes = db.relationship("Recipe", backref="author", lazy=True, cascade="all, delete-orphan")
    favourites = db.relationship("Recipe", secondary="favourites", backref="liked_by", lazy="dynamic")

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.created_on = datetime.now()

    def __repr__(self):
        return f"<User {self.email}>"


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)  
    ingredients = db.Column(db.Text, nullable=False)   
    instructions = db.Column(db.Text, nullable=False) 
    estimated_time = db.Column(db.Integer, nullable=False) 
    created_on = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"<Recipe {self.title} - {self.estimated_time} mins>"

favourites = db.Table(
    "favourites",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("recipe_id", db.Integer, db.ForeignKey("recipes.id"), primary_key=True)
)

@app.cli.command('drop_db')
def drop_db():
    db.drop_all()
    print('Dropped all databases')