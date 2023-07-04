from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .user import User


class Communication(db.Model):
    __tablename__ = "communications"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    user2_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user1 = db.relationship("User", foreign_keys=[user1_id])
    user2 = db.relationship("User", foreign_keys=[user2_id])

    direct_messages = db.relationship("DirectMessage", back_populates="communication")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "user1Id": self.user1_id,
            "user2Id": self.user2_id,
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct

    def to_dict_specific(self, userId):
        dct = {
            "id": self.id,
        }

        if self.user1_id != userId:
            dct["otherUser"] = self.user1_id

        if self.user2_id != userId:
            dct["otherUser"] = self.user2_id

        otherUser = User.query.get(dct["otherUser"]).to_dict()

        dct["userName"] = otherUser["username"]
        dct["userPic"] = otherUser["profilePic"]

        return dct
