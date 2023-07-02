from flask_socketio import SocketIO, emit
from .models import Communication, DirectMessage, User
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


# handle chat messages

@socketio.on("chat")
def handle_chat(data):
    print("____________________________________")
    print(data)
    print("____________________________________")
    emit("chat", data, broadcast=True, room=data.communicationId)
