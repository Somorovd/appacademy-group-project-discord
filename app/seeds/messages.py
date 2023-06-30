from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_messages():
    for i in range(1, 4):
        db.session.add(
            Message(user_id=1, channel_id=i * 5, content=fake.text(max_nb_chars=200))
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
