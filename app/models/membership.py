from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from enum import Enum

roles = Enum(
    "Roles",
    ["member", "admin", "owner", "banned"],
)


class Membership(db.Model):
    __tablename__ = "memberships"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    server_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=False
    )
    role = db.Column(db.Enum(roles), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="memberships")
    server = db.relationship("Server", back_populates="memberships")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "userId": self.user_id,
            "serverId": self.server_id,
            "role": self.role.name,
        }

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
