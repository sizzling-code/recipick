# Recipick

**Recipick** – An AI-powered recipe generator that helps you discover, customize, and save meals based on your ingredients and preferences.

**Live App:** [https://super-frangipane-b80e95.netlify.app/](https://super-frangipane-b80e95.netlify.app/)

Recipick is a modern recipe management application that allows users to register, log in, manage their profiles, create, favorite, and delete recipes. Built with a React TypeScript frontend and a Flask backend with PostgreSQL, this app emphasizes user-friendly design, security, and responsiveness. Users can create recipes using ingredients they have, favorite recipes they like, and manage their personal profile. The app also includes responsive design for mobile, tablet, and desktop, and provides real-time feedback using notifications.

## Features

* User Authentication: Register, log in, log out with JWT-based sessions.
* Profile Management: Update username, view personal stats.
* Recipe Management: Create and store recipes, favorite/unfavorite recipes, delete recipes.
* Responsive Design: Works on mobile, tablet, and desktop screens.
* Notifications: Success/error feedback using react-toastify.
* Protected Routes: Ensures only logged-in users can access certain pages.

## Tech Stack

* Frontend: React, TypeScript, Vite, React Router DOM, React Toastify, React Spinners
* Backend: Flask, Flask-JWT-Extended, Flask-Login, Flask-Migrate, SQLAlchemy, Flask-CORS
* Database: PostgreSQL (hosted on Railway)
* Hosting: Frontend on Netlify, Backend on Render

## Setup & Installation

### Backend

Clone the repository and navigate to the backend folder:

```bash
git clone <your-repo-url>
cd <backend-folder>
```

Create a virtual environment and install dependencies:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the backend root with the following:

```
FLASK_APP=src.extensions
FLASK_ENV=development
DATABASE_URL=postgresql://username:password@host:port/dbname
JWT_SECRET_KEY=your_secret_key
```

Run migrations:

```bash
flask db init
flask db migrate
flask db upgrade
```

Run the backend:

```bash
flask run
```

### Frontend

Navigate to the frontend folder:

```bash
cd <frontend-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Your frontend should now be accessible at [http://localhost:5173](http://localhost:5173).

## API Endpoints

### Authentication

* `/register` \[POST] – Register a new user
* `/login` \[POST] – Authenticate a user
* `/logout` \[POST] – Log out user
* `/user-profile` \[GET] – Get user profile (protected)
* `/user-home` \[GET] – Get user dashboard info (protected)

### Recipes

* `/my-recipes` \[GET] – Get all recipes for user
* `/generate` \[POST] – Generate recipes from ingredients
* `/delete/<id>` \[DELETE] – Delete a recipe
* `/favourite/<id>` \[POST] – Toggle favorite on a recipe

## Team Members & Roles

Teamwork matters! Below is the list of contributors, their roles, and emails:

* **Bett Romanus** – Frontend & Backend Developer – [bettromanus@gmail.com](mailto:bettromanus@gmail.com)
* **Mercy Nyambura** – Frontend Developer (Login and Register Pages) – [mercikamau131@gmail.com](mailto:mercikamau131@gmail.com)
* **Cecilia Thuo** – Frontend Developer (User Home page and Profile) – [ceciliathuo005@gmail.com](mailto:ceciliathuo005@gmail.com)

All team members contributed to coding, testing, and project management.

## Project Management & Collaboration

* Version Control: Git & GitHub
* Branch Strategy: `main` for stable release, `feature/*` for new features
* Communication: Weekly standups and code reviews
* Task Tracking: GitHub Issues for feature requests and bug tracking
* Collaboration: Code reviewed by at least one team member before merging



✅ **Live Demo:** [https://super-frangipane-b80e95.netlify.app/](https://super-frangipane-b80e95.netlify.app/)
