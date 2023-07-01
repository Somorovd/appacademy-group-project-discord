from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Server, Membership, Channel

server_routes = Blueprint("servers", __name__)


@server_routes.route("/current")
@login_required
def user_servers():
    """
    Query for all servers current user has membership for
    """
    servers = (
        Server.query.join(Membership)
        .filter(Membership.user_id == current_user.id)
        .order_by(Membership.created_at)
    )
    return {"servers": [server.to_dict() for server in servers]}


@server_routes.route("/<int:server_id>")
@login_required
def single_server(server_id):
    """
    Query for a single server details by id
    """
    server = (
        Server.query.join(Channel)
        .filter(Server.id == server_id)
        .order_by(Channel.created_at)
    )
    return server[0].to_dict_single()
