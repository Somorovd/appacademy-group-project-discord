from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from datetime import datetime


class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    channel_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False
    )
    content = db.Column(db.String(2000), nullable=False)
    was_edited = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="messages")
    channel = db.relationship("Channel", back_populates="messages")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "user": self.user.to_dict_message(),
            "channelId": self.channel_id,
            "content": self.content,
            "wasEdited": self.was_edited,
        }
        if timestamps:
            # socket cant serialize datetime object, so time converted to milliseconds
            dct["createdAt"] = self.created_at.timestamp() * 1000
            dct["updatedAt"] = self.updated_at.timestamp() * 1000

        return dct
