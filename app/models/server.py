from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    name = db.Column(db.String, nullable=False)
    about = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String, nullable=True)
    private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    owner = db.relationship("User", back_populates="servers")
    channels = db.relationship("Channel", back_populates="server")
    memberships = db.relationship("Membership", back_populates="server")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "ownerId": self.owner_id,
            "name": self.name,
            "about": self.about,
            "image": self.image,
            "private": self.private,
        }

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct

    def to_dict_single(self):
        dct = self.to_dict()
        dct["channels"] = {}
        for channel in self.channels:
            dct["channels"][channel.id] = channel.to_dict()
        return dct
