import base64
import jinja2
import json
from cryptography.fernet import Fernet
from flask import current_app, Blueprint

bp = Blueprint('encryption', __name__)


@jinja2.contextfilter
@bp.app_template_filter()
def encryptdata(context, value):
    a = Fernet(current_app.config['ENCRYPTION_KEY'])
    return json.dumps({'data': base64.b64encode(a.encrypt(value.encode('utf8'))).decode('ascii')})


@jinja2.contextfilter
@bp.app_template_filter()
def decryptdata(context, value):
    a = Fernet(current_app.config['ENCRYPTION_KEY'])
    return a.decrypt(value)
