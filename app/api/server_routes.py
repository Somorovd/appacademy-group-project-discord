from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Server, Membership, Channel
from ..forms.create_server_form import CreateServerForm
from ..forms.create_channel_form import CreateChannelForm
from ..forms.edit_server_form import EditServerForm
from sqlalchemy import or_, and_

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


def validation_errors_to_dict(validation_errors):
    return {k: v for k in validation_errors for v in validation_errors[k]}


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


@server_routes.route("/join/<int:serverId>")
@login_required
def join_server(serverId):
    exists = Membership.query.filter(
        and_(Membership.user_id == current_user.id, Membership.server_id == serverId)
    ).one_or_none()

    if exists is None:
        new_membership = Membership(
            user_id=current_user.id, server_id=serverId, role="member"
        )
        db.session.add(new_membership)
        db.session.commit()

    return {"serverId": serverId}


@server_routes.route("/<int:server_id>")
@login_required
def single_server(server_id):
    """
    Query for a single server details by id
    """

    server = Server.query.get(server_id)

    membership = Membership.query.filter(
        and_(Membership.server_id == server_id, Membership.user_id == current_user.id)
    ).one_or_none()

    if server == None or membership == None:
        return {}

    channels = Channel.query.filter(Channel.server_id == server_id).all()
    server.channels = channels
    return server.to_dict_single()


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

        general_channel = Channel(server_id=server.id, name="General", type="text")
        voice_channel = Channel(server_id=server.id, name="Voice Chat", type="voice")

        db.session.add(general_channel)
        db.session.add(voice_channel)
        db.session.commit()

        created_server = Server.query.get(server.id)
        return created_server.to_dict()

    return {"errors": validation_errors_to_dict(form.errors)}, 400


@server_routes.route("/<int:server_id>/edit", methods=["PUT"])
@login_required
def edit_server(server_id):
    form = EditServerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        server = Server.query.get(server_id)

        if current_user.id != server.owner_id:
            return {"errors": "Forbidden"}, 403

        server.name = data["name"]
        server.image = data["image"]
        server.private = data["private"]
        server.about = data["about"]

        db.session.commit()

        channels = Channel.query.filter(Channel.server_id == server_id).all()
        server.channels = channels

        return server.to_dict_single()

    return {"errors": validation_errors_to_dict(form.errors)}, 400


@server_routes.route("/<int:server_id>/delete", methods=["DELETE"])
@login_required
def delete_server(server_id):
    server = Server.query.get(server_id)

    if current_user.id != server.owner_id:
        return {"errors": "Forbidden"}, 403

    if server == None:
        return {"errors": "Server ID not found"}, 400

    db.session.delete(server)
    db.session.commit()
    return {"message": "Successfully deleted"}


@server_routes.route("/<int:server_id>/channels", methods=["POST"])
@login_required
def create_channel(server_id):
    form = CreateChannelForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        server = Server.query.get(server_id)

        if current_user.id != server.owner_id:
            return {"errors": "Forbidden"}, 403

        channel = Channel(
            server_id=data["server_id"], type=data["type"], name=data["name"]
        )
        db.session.add(channel)
        db.session.commit()

        return channel.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@server_routes.route("/discover")
@login_required
def get_all_public_servers():
    servers_query = Server.query.filter(Server.private == False).all()
    servers = [server.to_dict() for server in servers_query]

    return {"servers": servers}
