from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        password="password",
        email="demo@aa.io",
        phone_number="111-292-2982",
        profile_pic="demo-profile.png",
        birthday="1978-10-10",
    )
    bobbie = User(
        username="Bobbie",
        password="password",
        email="bobbie@aa.io",
        phone_number="684-168-8772",
        profile_pic="bobbie-profile.png",
        birthday="1987-05-08",
    )
    marnie = User(
        username="Marnie",
        password="password",
        email="marnie@aa.io",
        phone_number="215-354-4861",
        profile_pic="marnie-profile.png",
        birthday="1990-12-15",
    )
    katie = User(
        username="Katie",
        password="password",
        email="katie@aa.io",
        phone_number="654-231-8741",
        profile_pic="katie-profile.png",
        birthday="2002-03-22",
    )
    clyde = User(
        username="Clude",
        password="password",
        email="clyde@aa.io",
        phone_number="153-357-7864",
        profile_pic="clyde-profile.png",
        birthday="1999-14-08",
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(katie)
    db.session.add(clyde)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
