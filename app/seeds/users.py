from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        password="password",
        email="demo@aa.io",
        phone_number="111-292-2982",
        profile_pic="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
        birthday=date(1978, 10, 10),
    )
    bobbie = User(
        username="Bobbie",
        password="password",
        email="bobbie@aa.io",
        phone_number="684-168-8772",
        profile_pic="https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg",
        birthday=date(1987, 5, 8),
    )
    marnie = User(
        username="Marnie",
        password="password",
        email="marnie@aa.io",
        phone_number="215-354-4861",
        profile_pic="https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg",
        birthday=date(1990, 12, 15),
    )
    katie = User(
        username="Katie",
        password="password",
        email="katie@aa.io",
        phone_number="654-231-8741",
        profile_pic="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg",
        birthday=date(2002, 3, 22),
    )
    clyde = User(
        username="Clyde",
        password="password",
        email="clyde@aa.io",
        phone_number="153-357-7864",
        profile_pic="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
        birthday=date(1999, 4, 8),
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
