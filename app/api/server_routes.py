from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server

server_routes = Blueprint("servers", __name__)


@server_routes.route("/current")
@login_required
def user_servers():
    """
    Query for all servers current user has membership for
    """

    servers = Server.query.all()
    return {"servers": [server.to_dict() for server in servers]}
