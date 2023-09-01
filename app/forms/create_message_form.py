from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class CreateMessageForm(FlaskForm):
    server_id = IntegerField("server_id", validators=[DataRequired()])
    channel_id = IntegerField("channel_id", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired(), Length(1, 2000)])
