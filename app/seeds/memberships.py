from app.models import db, Membership, environment, SCHEMA
from sqlalchemy.sql import text


def seed_memberships():
    # server 1 memberships owned by user 1
    membership1 = Membership(user_id=1, server_id=1, role="owner")
    membership2 = Membership(user_id=2, server_id=1, role="member")
    membership3 = Membership(user_id=3, server_id=1, role="member")
    membership4 = Membership(user_id=4, server_id=1, role="admin")
    # server 2 memberships owned by user 1
    membership5 = Membership(user_id=1, server_id=2, role="owner")
    membership6 = Membership(user_id=2, server_id=2, role="admin")
    # server 3 memberships owned by user 2
    membership7 = Membership(user_id=2, server_id=3, role="owner")
    membership8 = Membership(user_id=1, server_id=3, role="member")
    membership9 = Membership(user_id=3, server_id=3, role="admin")
    # server 4 memberships owned by user 3
    membership10 = Membership(user_id=3, server_id=4, role="owner")

    db.session.add(membership1)
    db.session.add(membership2)
    db.session.add(membership3)
    db.session.add(membership4)
    db.session.add(membership5)
    db.session.add(membership6)
    db.session.add(membership7)
    db.session.add(membership8)
    db.session.add(membership9)
    db.session.add(membership10)
    db.session.commit()


def undo_memberships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.memberships RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM memberships"))

    db.session.commit()
