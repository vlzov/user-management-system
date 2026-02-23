from flask import jsonify

def success_response(data=None, message=None, status_code=200):
    return jsonify({
        "status": "success",
        "data": data,
        "message": message
    }), status_code

def error_response(message, status_code=400):
    return jsonify({
        "status": "error",
        "data": None,
        "message": message
    }), status_code