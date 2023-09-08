from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Message
from ..forms.create_message_form import CreateMessageForm
from ..socket import socketio

message_routes = Blueprint("messages", __name__)


def validation_errors_to_dict(validation_errors):
    return {k: v for k in validation_errors for v in validation_errors[k]}


@message_routes.route("/new", methods=["POST"])
@login_required
def create_message():
    form = CreateMessageForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if not form.validate_on_submit():
        return {"errors": validation_errors_to_dict(form.errors)}, 400

    new_message = Message(
        user_id=current_user.id,
        channel_id=form.data["channel_id"],
        content=form.data["content"],
    )

    db.session.add(new_message)
    db.session.commit()

    res_message = new_message.to_dict(timestamps=True)
    socket_data = {
        "payload": res_message,
        "type": "messages/CREATE_MESSAGE",
    }
    socketio.emit("messages", socket_data, room=f"Channel-{res_message['channelId']}")
    return {"message": res_message}


@message_routes.route("/<int:message_id>/edit", methods=["PUT"])
@login_required
def edit_message(message_id):
    form = CreateMessageForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if not form.validate_on_submit():
        return {"errors": validation_errors_to_dict(form.errors)}, 400

    message = Message.query.get(message_id)

    if not message:
        return {"errors": "Message not found"}, 404

    if not message.user_id == current_user.id:
        return {"errors": "Forbidden"}, 403

    message.content = form.data["content"]
    message.was_edited = True
    db.session.commit()

    res_message = message.to_dict(timestamps=True)
    socket_data = {
        "payload": res_message,
        "type": "messages/EDIT_MESSAGE",
    }

    socketio.emit("messages", socket_data, room=f"Channel-{res_message['channelId']}")
    return {"message": res_message}


@message_routes.route("/<int:message_id>/delete", methods=["DELETE"])
@login_required
def delete_message(message_id):
    message = Message.query.get(message_id)

    if not message:
        return {"errors": "Message not found"}, 404

    if not message.user_id == current_user.id:
        return {"errors": "Forbidden"}, 403

    db.session.delete(message)
    db.session.commit()

    message_dict = {
        "id": message_id,
        "channelId": message.channel_id,
        "user": {"id": current_user.id},
    }

    socket_data = {
        "payload": message_dict,
        "type": "messages/DELETE_MESSAGE",
    }
    socketio.emit("messages", socket_data, room=f"Channel-{message.channel_id}")

    return {"message": message_dict}
