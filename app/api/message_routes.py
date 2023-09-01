from flask import Blueprint, request
from flask_login import login_required, current_user

message_routes = Blueprint("messages", __name__)


@message_routes.route("/new")
@login_required
def create_message():
    print("message recieved")
