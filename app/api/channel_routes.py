from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Channel, Message, User


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
        .order_by(Message.created_at)
        .all()
    )

    channel.messages = messages
    return channel.to_dict_single()
