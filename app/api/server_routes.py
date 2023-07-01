from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Server, Membership

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
