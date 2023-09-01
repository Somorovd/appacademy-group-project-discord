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

    res_message = new_message.to_dict()
    socketio.emit("messages", res_message, room=f"Channel-{res_message['channelId']}")
    return res_message
