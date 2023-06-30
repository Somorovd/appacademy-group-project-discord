from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    about = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String, nullable=True)
    private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    owner = db.relationship("User", back_populates="servers")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "ownerId": self.owner_d,
            "name": self.name,
            "about": self.about,
            "image": self.image,
            "private": self.private,
        }

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
