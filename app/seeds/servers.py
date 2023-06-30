from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


def seed_servers():
    server1 = Server(
        owner_id = 1,
        name = "Demo-Central",
        about = "Where are the Demo-Users come to hangout!",
        image = None,
        private = False,
    )

    server2 = Server(
        owner_id = 1,
        name = "CodeLabs",
        about = "Super Elite Coders here",
        image = None,
        private = True
    )

    server3 = Server(
        owner_id = 2,
        name = "We Ran out of names",
        about = "Super interesting about section here...",
        image = None,
        private = False
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
