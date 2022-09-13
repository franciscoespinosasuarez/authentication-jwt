"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


#----------------------CREAR USUARIO--------------------------------
@api.route('getuser', methods=['GET'])
def get_user():
    user = User.query.all()
    all_user = list(map(lambda user: user.serialize(), user))
    return jsonify(all_user), 201


@api.route('/user', methods=['POST'])
def create_user():
    body = request.get_json()
    password = request.json.get('password')
    user = User(email=body["email"], password=body["password"])
    data_response = {
        "mensaje": "usuario creado correctamente"
    }
    db.session.add(user)
    db.session.commit()
    return jsonify(data_response), 201

    return jsonify(response_body), 200


#-----------------------LOGIN----------------------------------------

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()


    if not user:
        return jsonify({"message": "El usuario no fue encontrado"}), 401

    
    # CREACIÓN DE TOKEN
    access_token = create_access_token(identity=email)


    return jsonify(access_token=access_token, user_id=user.id), 200   
 
 

 #-----------------------VALIDATE TOKEN----------------------------------------

@api.route('/validatoken', methods=['GET'])
@jwt_required()
def validatoken():
    return jsonify("ok"), 200