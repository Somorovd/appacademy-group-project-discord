from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)
    about = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String, nullable=True)
    private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(Timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_d,
            'name': self.name,
            'about': self.about,
            'image': self.image,
            'private': self.private
        }
