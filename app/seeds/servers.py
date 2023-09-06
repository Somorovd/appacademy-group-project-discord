from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


def seed_servers():
    server1 = Server(
        owner_id=1,
        name="App Academy August",
        about="August Cohort -- Best Cohort",
        image="https://cdn.hashnode.com/res/hashnode/image/upload/v1658963617173/297PfSAy6.png",
        private=False,
    )

    server2 = Server(
        owner_id=1,
        name="SportsBall",
        about="sports BALL!!! sports BALL!!! sports BALL!!!",
        image="https://i0.wp.com/evanstonnow.com/wp-content/uploads/2021/12/basketball-in-basket-shutterstock_1489878983.jpg",
        private=False,
    )

    server3 = Server(
        owner_id=2,
        name="Marnie's Yarns",
        about="Discord Server for the very popular Marnie's Yarns Knitting YouTube Channel",
        image="https://www.thesewingcollection.com/wp-content/uploads/2019/04/iec1807-04Apr-M.jpg",
        private=False,
    )

    server4 = Server(
        owner_id=3,
        name="GM Chess Champions",
        about="Level up your chess skills with top players from all over the globe.",
        image="https://cdn.pixabay.com/photo/2015/03/04/16/20/chess-659040_640.jpg",
        private=False,
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
