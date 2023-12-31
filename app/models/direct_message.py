from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .user import User


class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    communication_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("communications.id")),
        nullable=False,
    )
    content = db.Column(db.String(500), nullable=False)
    was_edited = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="direct_messages")
    communication = db.relationship("Communication", back_populates="direct_messages")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "senderId": self.sender_id,
            "communicationId": self.communication_id,
            "content": self.content,
            "wasEdited": self.was_edited,
        }
        if timestamps:
            dct["createdAt"] = f"{self.created_at}"
            dct["updatedAt"] = f"{self.updated_at}"
        sender = User.query.get(self.sender_id)
        dct["sender"] = sender.username
        dct["senderPic"] = sender.profile_pic

        return dct
