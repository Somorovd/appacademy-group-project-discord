from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from enum import Enum

types = Enum(
    "Types",
    [
        "text",
        "voice",
    ],
)


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=False
    )
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.Enum(types))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    server = db.relationship("Server", back_populates="channels")
    messages = db.relationship(
        "Message", back_populates="channel", cascade="all, delete-orphan"
    )

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "serverId": self.server_id,
            "name": self.name,
            "type": self.type.name,
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct

    def to_dict_single(self):
        dct = self.to_dict()
        dct["messages"] = [m.to_dict(timestamps=True) for m in self.messages]
        return dct
