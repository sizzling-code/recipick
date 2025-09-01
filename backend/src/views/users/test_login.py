import pytest
from flask_jwt_extended import decode_token
from src import app as flask_app, db, bcrypt
from src.views.models import User

@pytest.fixture
def app():
    """Return Flask app in testing context."""
    flask_app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "JWT_SECRET_KEY": "test-secret"
    })
    with flask_app.app_context():
        db.create_all()
        yield flask_app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def test_user(app):
    """Create a test user in the database."""
    user = User(
        username="testuser",
        email="test@example.com",
        password=bcrypt.generate_password_hash("password123").decode("utf-8"),
    )
    db.session.add(user)
    db.session.commit()
    return user


def test_login_missing_fields(client):
    response = client.post("/login", json={})
    assert response.status_code == 400
    assert response.json["error"] == "Missing required fields" 


def test_login_invalid_credentials(client, test_user):
    response = client.post("/login", json={
        "email": "test@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
    assert response.json["error"] == "Invalid credentials"  


def test_login_success(client, test_user):
    response = client.post("/login", json={
        "email": "test@example.com",
        "password": "password123"
    })

    assert response.status_code == 200
    assert "access_token" in response.json
    assert response.json["message"] == "Login successful"

    token = response.json["access_token"]
    decoded = decode_token(token)
    assert decoded["sub"] == str(test_user.id)
    assert decoded["username"] == "testuser"
    assert decoded["email"] == "test@example.com"


def test_user_profile_protected(client):
    """Should return 401 if no token provided."""
    response = client.get("/user-profile")
    assert response.status_code == 401


def test_user_profile_success(client, test_user):
    login_res = client.post("/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    token = login_res.json["access_token"]

    response = client.get("/user-profile", headers={
        "Authorization": f"Bearer {token}"
    })

    assert response.status_code == 200
    assert response.json["user"]["username"] == "testuser"
    assert response.json["user"]["email"] == "test@example.com"
