from app.models import db, Channel, environment, SCHEMA
from app.models.channel import types
from sqlalchemy.sql import text
from random import randint


# Adds a demo user, you can add other users here if you want
def seed_channels():
    for i in range(1, 5):
        db.session.add(
            Channel(
                server_id=i,
                name="General",
                type=types.text,
            )
        )
        db.session.add(
            Channel(
                server_id=i,
                name="Voice Chat",
                type=types.voice,
            )
        )
        for j in range(4):
            db.session.add(
                Channel(
                    server_id=i,
                    name=f"Channel-{randint(1, 100)}",
                    type=types.text,
                )
            )

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
