from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

# from email_validator import validate_email, EmailNotValidError
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


def is_phone_number(form, field):
    phone_number = field.data
    match = re.fullmatch("^\d{3}-\d{3}-\d{4}$", phone_number)
    if not match:
        raise ValidationError("Invalid Phone Number Format")


# def check_email(form, field):
#     validate_email(field.data, check_deliverability=False)


class SignUpForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), username_exists])
    email = StringField(
        "email",
        validators=[
            DataRequired(),
            user_exists,
            # check_email,
        ],
    )
    password = StringField("password", validators=[DataRequired()])
    phone_number = StringField(
        "phone number", validators=[DataRequired(), is_phone_number]
    )
    birthday = DateField("birthday", validators=[DataRequired()])
