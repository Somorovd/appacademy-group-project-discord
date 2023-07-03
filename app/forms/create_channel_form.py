from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class CreateChannelForm(FlaskForm):
    server_id = IntegerField("server_id", validators=[DataRequired()])
    type = StringField("type", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired(), Length(2, 20)])
