from flask import Blueprint, request
from ..services.user_service import UserService
from ..schemas.user_schema import UserCreateSchema
from ..utils.responses import success_response, error_response

users_bp = Blueprint("users", __name__)
schema = UserCreateSchema()

@users_bp.get("/")
def get_users():
    users = UserService.get_all()
    return success_response(
        data=[u.to_dict() for u in users]
    )

@users_bp.get("/<int:user_id>")
def get_user(user_id):
    user = UserService.get_by_id(user_id)
    if not user:
        return error_response("User not found", 404)

    return success_response(user.to_dict())

@users_bp.post("/")
def create_user():
    json_data = request.get_json()

    errors = schema.validate(json_data)
    if errors:
        return error_response(errors, 400)

    try:
        user = UserService.create(
            name=json_data["name"],
            email=json_data["email"]
        )
        return success_response(user.to_dict(), "User created", 201)
    except ValueError as e:
        return error_response(str(e), 400)
    
@users_bp.delete("/<int:user_id>")
def delete_user(user_id):
    user = UserService.delete(user_id)
    if not user:
        return error_response("User not found", 404)

    return success_response(user.to_dict(), "User deleted")


@users_bp.put("/<int:user_id>")
def update_user(user_id):
    json_data = request.get_json()

    errors = schema.validate(json_data, partial=True)
    if errors:
        return error_response(errors, 400)

    try:
        user = UserService.update(
            user_id,
            name=json_data.get("name"),
            email=json_data.get("email")
        )

        if not user:
            return error_response("User not found", 404)

        return success_response(user.to_dict(), "User updated")
    except ValueError as e:
        return error_response(str(e), 400)