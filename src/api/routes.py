"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Location, Episode, Favorite
from api.utils import generate_sitemap, APIException

api = Blueprint("api", __name__)


# USERS
#
@api.route("/user", methods=["GET"])
def get_all_users():
    users = User.query.all()
    users_serialized = [user.serialize() for user in users]
    return jsonify(users_serialized), 200


@api.route("/user/<int:user_id>", methods=["GET"])
def get_one_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "Not able to find user with the provided id."}), 400
    return jsonify({"User": user.serialize()}), 200


@api.route("/user", methods=["POST"])
def create_new_user():
    body = request.json
    new_user = User(
        name=body["name"],
        email=body["email"],
        password=body["password"],
        is_active=body["is_active"],
    )

    # maybe here we need to make some validations in particulary with email???
    # how about password?? What's the best practice?

    db.session.add(new_user)
    db.session.commit()
    response_body = {"Users": "User created successfully"}
    return jsonify(response_body), 200


# CHARACTERS
#
@api.route("/character", methods=["GET"])
def get_all_characters():
    characters = Character.query.all()
    characters_serialized = [character.serialize() for character in characters]
    return jsonify({"characters": characters_serialized}), 200


@api.route("/character/<int:character_id>", methods=["GET"])
def get_one_character(character_id):
    character = Character.query.get(character_id)
    if not character:
        return (
            jsonify({"Error": "Not able to find character with the provided id."}),
            400,
        )
    print(character.serialize())
    return jsonify(character.serialize()), 200


@api.route("/character", methods=["POST"])
def create_new_character():
    body = request.json
    new_character = Character(
        name=body["name"],
        image=body["image"],
        gender=body["gender"],
        status=body["status"],
        specie=body["specie"],
    )
    db.session.add(new_character)
    db.session.commit()
    response_body = {"Character": "Character created successfully"}
    return jsonify(response_body), 200


# LOCATIONS
#
@api.route("/location", methods=["GET"])
def get_all_locations():
    locations = Location.query.all()
    locations_serialized = [location.serialize() for location in locations]
    return jsonify({"locations": locations_serialized}), 200


@api.route("/location/<int:location_id>", methods=["GET"])
def get_one_location(location_id):
    location = Location.query.get(location_id)
    if not location:
        return (
            jsonify({"Error": "Not able to find location with the provided id."}),
            400,
        )
    return jsonify(location.serialize()), 200


@api.route("/location", methods=["POST"])
def create_new_location():
    body = request.json
    new_location = Location(
        name=body["name"], type=body["type"], dimension=body["dimension"]
    )
    db.session.add(new_location)
    db.session.commit()
    response_body = {"Locations": "Location created successfully"}
    return jsonify(response_body), 200


# EPISODES
#
@api.route("/episode", methods=["GET"])
def get_all_episodes():
    episodes = Episode.query.all()
    episodes_serialized = [epidode.serialize() for epidode in episodes]
    return jsonify({"episodes": episodes_serialized}), 200


@api.route("/episode/<int:episode_id>", methods=["GET"])
def get_one_episode(episode_id):
    episode = Episode.query.get(episode_id)
    if not episode:
        return (
            jsonify({"Error": "Not able to find episode with the provided id."}),
            400,
        )
    return jsonify(episode.serialize()), 200


@api.route("/episode", methods=["POST"])
def create_new_episode():
    body = request.json
    new_episode = Episode(
        name=body["name"], air_date=body["air_date"], episode=body["episode"]
    )
    db.session.add(new_episode)
    db.session.commit()
    response_body = {"Episodes": "Episode created successfully"}
    return jsonify(response_body), 200


# FAVORITES
#
@api.route("/favorite/<int:id>", methods=["GET"])
def get_user_favorites(id):
    favorites = Favorite.query.filter_by(user_id=id).all()
    if len(favorites) == 0:
        return jsonify({"Favorites": "No favorites for that user"})
    return jsonify({"Favorites": [favorite.serialize() for favorite in favorites]}), 200


@api.route("/favorite/character/<int:char_id>", methods=["POST"])
def create_new_character_favorite(char_id):
    body = request.json
    new_favorite = Favorite(user_id=body["user_id"], character_id=char_id)
    db.session.add(new_favorite)
    db.session.commit()
    response_body = {"Favorites": "Favorite created successfully"}
    return jsonify(response_body), 200


@api.route("/favorite/location/<int:local_id>", methods=["POST"])
def create_new_location_favorite(local_id):
    body = request.json
    new_favorite = Favorite(user_id=body["user_id"], location_id=local_id)
    db.session.add(new_favorite)
    db.session.commit()
    response_body = {"Favorites": "Favorite created successfully"}
    return jsonify(response_body), 200


@api.route("/favorite/episode/<int:epi_id>", methods=["POST"])
def create_new_episode_favorite(epi_id):
    body = request.json
    new_favorite = Favorite(user_id=body["user_id"], episode_id=epi_id)
    db.session.add(new_favorite)
    db.session.commit()
    response_body = {"Favorites": "Favorite created successfully"}
    return jsonify(response_body), 200


@api.route("/favorite/<int:fav_id>", methods=["DELETE"])
def delete_favorite(fav_id):
    favorite = Favorite.query.get(fav_id)
    print(favorite)
    if not favorite:
        return jsonify({"Error": "No favorite found with this id"}), 400
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"todo": "Deleted"}), 200


@api.route("/user/<int:u_id>/favorite/character/<int:char_id>", methods=["DELETE"])
def delete_user_favorite_character(u_id, char_id):
    favorite = Favorite.query.filter_by(user_id=u_id, character_id=char_id).first()
    if not favorite:
        return jsonify({"Error": "No favorite found with this id"}), 400
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"Favorite": "User favorite character successfully deleted!"}), 200


@api.route("/user/<int:u_id>/favorite/location/<int:loc_id>", methods=["DELETE"])
def delete_user_favorite_location(u_id, loc_id):
    favorite = Favorite.query.filter_by(user_id=u_id, location_id=loc_id).first()
    if not favorite:
        return jsonify({"Error": "No favorite found with this id"}), 400
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"Favorite": "User favorite location successfully deleted!"}), 200


@api.route("/user/<int:u_id>/favorite/episode/<int:epi_id>", methods=["DELETE"])
def delete_user_favorite_episode(u_id, epi_id):
    favorite = Favorite.query.filter_by(user_id=u_id, episode_id=epi_id).first()
    if not favorite:
        return jsonify({"Error": "No favorite found with this id"}), 400
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"Favorite": "User favorite episode successfully deleted!"}), 200
