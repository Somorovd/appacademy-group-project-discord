from flask_socketio import SocketIO, emit, join_room, send
from .models import Communication, DirectMessage, User, Message, db
import os
from sqlalchemy import delete
from flask_login import current_user

# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [os.environ.get("REACT_APP_BASE_URL")]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("join")
def on_join_DMs(data):
    room = data["room"]
    join_room(room)


# handle chat messages
@socketio.on("chat")
def handle_DMs(data):
    room = data["room"]

    if data["deleted"]:
        deleted_dm = DirectMessage.query.get(int(data["deleted"]))
        if current_user.id != deleted_dm.sender_id:
            return
        db.session.delete(deleted_dm)
        db.session.commit()
        emit("chat", "refresh", room=room)
        return

    if data["edited"]:
        edited_dm = DirectMessage.query.get(int(data["edited"]))
        if current_user.id != edited_dm.sender_id:
            return
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


@socketio.on("messages")
def handle_messages(data):
    room = data["room"]

    if data["deleted"]:
        message_to_delete = Message.query.get(int(data["deleted"]))
        if current_user.id != message_to_delete.user_id:
            return
        db.session.delete(message_to_delete)
        db.session.commit()
        emit("messages", "refresh", room=room)
        return

    if data["edited"]:
        message_to_edit = Message.query.get(int(data["edited"]))
        if current_user.id != message_to_edit.user_id:
            return
        message_to_edit.content = data["content"]
        message_to_edit.was_edited = True
        db.session.commit()
        emit("messages", "refresh", room=room)
        return

    new_message = Message(
        user_id=data["user"]["id"],
        channel_id=data["channel_id"],
        content=data["content"],
    )

    db.session.add(new_message)
    db.session.commit()

    res_message = new_message.to_dict()

    emit("messages", res_message, room=room)
