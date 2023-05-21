from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    favorites = db.relationship("Favorite", backref="user")

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {"id": self.id, "name": self.name, "email": self.email}


class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    image = db.Column(db.String(250), unique=False, nullable=True)
    gender = db.Column(db.String(80), unique=False, nullable=True)
    status = db.Column(db.String(80), unique=False, nullable=True)
    specie = db.Column(db.String(80), unique=False, nullable=True)
    character_favorite = db.relationship("Favorite", backref="character_fav")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "gender": self.gender,
            "status": self.status,
            "specie": self.specie,
        }


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    type = db.Column(db.String(80), unique=False, nullable=True)
    dimension = db.Column(db.String(80), unique=False, nullable=True)
    location_favorite = db.relationship("Favorite", backref="location_fav")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "dimension": self.dimension,
        }


class Episode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    air_date = db.Column(db.String(80), unique=False, nullable=True)
    episode = db.Column(db.String(80), unique=False, nullable=True)
    episode_favorite = db.relationship("Favorite", backref="episode_fav")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "air_date": self.air_date,
            "episode": self.episode,
        }


class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    character_id = db.Column(
        db.Integer, db.ForeignKey("character.id"), nullable=True)
    location_id = db.Column(
        db.Integer, db.ForeignKey("location.id"), nullable=True)
    episode_id = db.Column(
        db.Integer, db.ForeignKey("episode.id"), nullable=True)

    def serialize(self):
        if self.character_id:
            return {
                "id": self.id,
                "type": "character",
                "name": getattr(self.character_fav, 'name'),
                "element_id": self.character_id
            }
        if self.location_id:
            return {
                "id": self.id,
                "type": "location",
                "name": getattr(self.location_fav, 'name'),
                "element_id": self.location_id
            }
        if self.episode_id:
            return {
                "id": self.id,
                "type": "episode",
                "name": getattr(self.episode_fav, 'name'),
                "element_id": self.episode_id
            }
