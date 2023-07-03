from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Communication, DirectMessage
from sqlalchemy import or_, and_
from ..models import db



communication_routes = Blueprint('communications', __name__)

@communication_routes.route("/current")
@login_required
def get_DMs():
    """
    Query for all conversations that the user has made
    """
    dms_query = Communication.query.filter(or_(
        Communication.user1_id == current_user.id,
        Communication.user2_id == current_user.id
    )).all()

    dms = [ dm.to_dict_specific(current_user.id) for dm in dms_query ]
    # print("--------------------------")
    # print(dms)
    # print("--------------------------")
    # print(current_user.id)

    return { "dms": dms }

@communication_routes.route('/users')
@login_required
def get_all_users():
    all_users_query = User.query.filter(User.id != current_user.id).all()
    all_users = [ user.to_dict() for user in all_users_query ]
    return { "users": all_users}

@communication_routes.route('/new/<int:otherUserId>', methods=["POST"])
@login_required
def create_new_dm(otherUserId):
    print("___________________________________")
    print(otherUserId)
    print("___________________________________")
    print(current_user.id)
    print("___________________________________")

    exists = Communication.query.filter(or_(
        and_(Communication.user1_id == otherUserId, Communication.user2_id == current_user.id),
        and_(Communication.user1_id == current_user.id, Communication.user2_id == otherUserId)
    )).one_or_none()

    if exists is None:
        new_communication = Communication(user1_id=current_user.id, user2_id=otherUserId)
        db.session.add(new_communication)
        db.session.commit()
        return { "id" : new_communication.id }


    return { "id" : exists.id}


@communication_routes.route("/<int:communication_id>")
@login_required
def get_single_dm(communication_id):
    dms_query = DirectMessage.query.filter(DirectMessage.communication_id == communication_id).all()
    dms = [dm.to_dict(timestamps = True) for dm in dms_query]
    # print("--------------------------")
    # print(dms)
    # print("--------------------------")

    communication_query = Communication.query.get(communication_id)
    if communication_query is None:
        return { "messages": [], "communication": {} }

    communication = communication_query.to_dict()

    if current_user.id != communication['user1Id'] and current_user.id != communication['user2Id']:
        return { "messages": [], "communication": {} }

    return { "messages": dms, "communication": communication}
