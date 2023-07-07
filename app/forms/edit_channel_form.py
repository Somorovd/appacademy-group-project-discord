from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError


class EditChannelForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(2, 20)])
