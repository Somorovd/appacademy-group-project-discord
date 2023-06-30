from app.models import db, User, DirectMessage, Communication, environment, SCHEMA
from sqlalchemy.sql import text


def seed_direct_messages():
    message1 = DirectMessage(
        sender_id=1,
        communication_id=1,
        content="Whats up man how's it going?"
    )
    message2 = DirectMessage(
        sender_id=2,
        communication_id=1,
        content="Not bad dude what about you?"
    )
    message3 = DirectMessage(
        sender_id=1,
        communication_id=2,
        content="Hey"
    )
    message4 = DirectMessage(
        sender_id=3,
        communication_id=2,
        content="Hello"
    )
    message5 = DirectMessage(
        sender_id=1,
        communication_id=2,
        content="Hope you are doing well"
    )
    message6 = DirectMessage(
        sender_id=3,
        communication_id=2,
        content="I am thanks"
    )
    message7 = DirectMessage(
        sender_id=1,
        communication_id=3,
        content="Hey how are you?"
    )
    message8 = DirectMessage(
        sender_id=4,
        communication_id=3,
        content="Not bad how are you?"
    )
    message9 = DirectMessage(
        sender_id=1,
        communication_id=3,
        content="Excellent"
    )
    message10 = DirectMessage(
        sender_id=3,
        communication_id=4,
        content="Can I have some help with the homework"
    )
    message11 = DirectMessage(
        sender_id=2,
        communication_id=4,
        content="Absolutly not"
    )
    message12 = DirectMessage(
        sender_id=5,
        communication_id=5,
        content="We've Been Trying To Reach You About Your Car's Extended Warranty"
    )


    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.add(message11)
    db.session.add(message12)
    db.session.commit()

def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
