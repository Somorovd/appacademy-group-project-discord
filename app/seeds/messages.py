from app.models import db, Message, Server, Membership, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice, randint

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_messages():
    servers = Server.query.all()
    for server in servers:
        members = Membership.query.filter(Membership.server_id == server.id).all()
        for channel in server.channels:
            for _ in range(1, 30):
                db.session.add(
                    Message(
                        user_id=choice(members).user_id,
                        channel_id=channel.id,
                        content=fake.text(max_nb_chars=randint(20, 1000)),
                    )
                )

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
