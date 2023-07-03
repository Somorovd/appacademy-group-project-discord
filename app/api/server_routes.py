from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Server, Membership, Channel
from ..forms.create_server_form import CreateServerForm
from ..forms.create_channel_form import CreateChannelForm

server_routes = Blueprint("servers", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


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


@server_routes.route("/new", methods=["POST"])
@login_required
def create_server():
    form = CreateServerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        server = Server(
            owner_id=form.data["owner_id"],
            name=form.data["name"],
            image=form.data["image"],
            private=form.data["private"],
            about=form.data["about"],
        )
        db.session.add(server)
        db.session.commit()

        membership = Membership(
            user_id=form.data["owner_id"], server_id=server.id, role="owner"
        )
        db.session.add(membership)
        db.session.commit()

        created_server = Server.query.get(server.id)
        return created_server.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@server_routes.route("/<int:server_id>/channels", methods=["POST"])
@login_required
def create_channel(server_id):
    form = CreateChannelForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        channel = Channel(
            server_id=data["server_id"], type=data["type"], name=data["name"]
        )
        db.session.add(channel)
        db.session.commit()

        return channel.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
