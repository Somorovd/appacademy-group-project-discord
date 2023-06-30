from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(20), nullable=False)
    profile_pic = db.Column(db.String(255))
    birthday = db.Column(db.Date)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    communications1 = db.relationship("Communication", back_populates="user1")
    communications2 = db.relationship("Communication", back_populates="user2")

    servers = db.relationship("Server", back_populates="owner")
    direct_messages = db.relationship("DirectMessage", back_populates="user")
    memberships = db.relationship("Membership", back_populates="user")
    messages = db.relationship("Message", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phoneNumber": self.phone_number,
            "profilePic": self.profile_pic,
            "birthday": self.birthday,
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
