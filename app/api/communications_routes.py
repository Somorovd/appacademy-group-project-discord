from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Communication, DirectMessage
from sqlalchemy import or_

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
