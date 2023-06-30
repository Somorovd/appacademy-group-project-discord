from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Communications(db.Model):
    __tablename__ = "communications"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.Timestamp, nullable=False, default=datetime.now())
    uptaded_at = db.Column(db.Timestamp, nullable=False, default=datetime.now())

    user1 = db.relationship("User", back_populates="users")
    user2 = db.relationship("User", back_populates="users")


    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "user1_id": self.user1_id,
            "user2_id": self.user2_id,
        }
        if timestamps:
            dct["created_at"] = self.created_at
            dct["updated_at"] = self.uptaded_at

        return dct
