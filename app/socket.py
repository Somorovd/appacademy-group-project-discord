from flask_socketio import SocketIO, emit, join_room, send
from .models import Communication, DirectMessage, User, db
import os

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://actual-app-url.herokuapp.com',
        'https://actual-app-url.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("join")
def on_join(data):
    room = int(data['room'])
    join_room(room)
    print("INNNNN")


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = int(data["room"])

    new_dm = DirectMessage(
        communication_id=int(data["room"]),
        content=data["content"],
        sender_id=data["user"]["id"]
    )
    db.session.add(new_dm)
    db.session.commit()

    emit("chat", new_dm.to_dict(), room=room)
