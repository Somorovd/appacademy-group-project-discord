from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Communication(db.Model):
    __tablename__ = "communications"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    uptaded_at = db.Column(
        db.DateTime(timezone=True), nullable=False, onupdate=func.now()
    )

    user1 = db.relationship(
        "User", foreign_keys=[user1_id], back_populates="communications1"
    )
    user2 = db.relationship(
        "User", foreign_keys=[user2_id], back_populates="communications2"
    )

    direct_messages = db.relationship("DirectMessage", back_populates="communication")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "user1Id": self.user1_id,
            "user2Id": self.user2_id,
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.uptaded_at

        return dct
