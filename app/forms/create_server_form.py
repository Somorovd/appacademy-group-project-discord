from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, ValidationError


def is_image_url(form, field):
    image = field.data
    if not image:
        return

    image_name = image.split("/")[-1]
    split = image_name.split(".")
    valid_extensions = ["jpg", "jpeg", "png"]
    if (not len(split) == 2) or (split[1] not in valid_extensions):
        raise ValidationError(
            "Image url must be of type " + ", ".join(valid_extensions)
        )


class CreateServerForm(FlaskForm):
    owner_id = IntegerField("owner_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired(), Length(2, 50)])
    image = StringField("image", validators=[is_image_url])
    private = BooleanField("private", validators=[DataRequired()])
    about = StringField("about", validators=[Length(0, 500)])
