from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Channel, Server, Message, User


channel_routes = Blueprint("channels", __name__)


@channel_routes.route("/<int:channel_id>")
@login_required
def single_channel(channel_id):
    """
    Query for a single channel details by id
    """

    channel = Channel.query.get(channel_id)

    if channel == None:
        return

    messages = (
        Message.query.filter(Message.channel_id == channel_id)
        .join(User)
        .order_by(Message.created_at.desc())
        .all()
    )

    channel.messages = messages
    return channel.to_dict_single()


@channel_routes.route("/<int:channel_id>/delete", methods=["DELETE"])
@login_required
def delete_channel(channel_id):
    channel = Channel.query.get(channel_id)

    if channel == None:
        return {"errors": "Channel not found"}, 404

    server = Server.query.get(channel.server_id)

    if not current_user.id == server.owner_id:
        return {"errors": "Forbidden"}, 403

    db.session.delete(channel)
    db.session.commit()

    return {"message": "Successfully deleted"}
