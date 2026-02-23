from flask import Flask
from .config import Config
from .extensions import db, migrate, cors
from .api.users import users_bp
from .errors import register_error_handlers

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    app.register_blueprint(users_bp, url_prefix="/users")

    register_error_handlers(app)

    return app