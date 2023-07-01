from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Communication
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
