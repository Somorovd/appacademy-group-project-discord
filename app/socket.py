from flask_socketio import SocketIO, emit, join_room, send
from .models import Communication, DirectMessage, User, db
import os
from sqlalchemy import delete

# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [os.environ.get("REACT_APP_BASE_URL")]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("join")
def on_join_DMs(data):
    room = int(data["room"])
    join_room(room)
    print("INNNNN")


# handle chat messages
@socketio.on("chat")
def handle_DMs(data):
    room = int(data["room"])

    if data["deleted"]:
        deleted_dm = DirectMessage.query.get(int(data["deleted"]))
        db.session.delete(deleted_dm)
        db.session.commit()
        emit("chat", "refresh", room=room)
        return

    if data["edited"]:
        edited_dm = DirectMessage.query.get(int(data["edited"]))
        edited_dm.content = data["content"]
        edited_dm.was_edited = True
        db.session.commit()
        emit("chat", "refresh", room=room)
        return

    new_dm = DirectMessage(
        communication_id=int(data["room"]),
        content=data["content"],
        sender_id=data["user"]["id"],
    )
    db.session.add(new_dm)
    db.session.commit()

    res_dm = new_dm.to_dict(timestamps=True)

    emit("chat", res_dm, room=room)
