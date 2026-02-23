from ..models.user import User
from ..extensions import db

class UserService:

    @staticmethod
    def get_all():
        return User.query.all()

    @staticmethod
    def get_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def create(name, email):
        if User.query.filter_by(email=email).first():
            raise ValueError("Email already exists")

        user = User(name=name, email=email)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def delete(user_id):
        user = User.query.get(user_id)
        if not user:
            return None

        db.session.delete(user)
        db.session.commit()
        return user

    @staticmethod
    def update(user_id, name=None, email=None):
        user = User.query.get(user_id)
        if not user:
            return None

        if email and email != user.email:
            if User.query.filter_by(email=email).first():
                raise ValueError("Email already exists")
            user.email = email

        if name:
            user.name = name

        db.session.commit()
        return user