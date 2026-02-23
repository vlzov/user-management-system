from marshmallow import Schema, fields, validate

class UserCreateSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)