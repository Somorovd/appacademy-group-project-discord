from app.models import db, User, Communication, environment, SCHEMA
from sqlalchemy.sql import text


def seed_communications():
    communication1 = Communication(
        user1_id=1,
        user2_id=2,
    )
    communication2 = Communication(
        user1_id=1,
        user2_id=3,
    )
    communication3 = Communication(
        user1_id=1,
        user2_id=4,
    )
    communication4 = Communication(
        user1_id=2,
        user2_id=3,
    )
    communication5= Communication(
        user1_id=2,
        user2_id=5,
    )

    db.session.add(communication1)
    db.session.add(communication2)
    db.session.add(communication3)
    db.session.add(communication4)
    db.session.add(communication5)

    db.session.commit()

def undo_communications():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.communications RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM communications"))

    db.session.commit()
