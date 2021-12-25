import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SERVER_NAME = os.environ['SERVER_NAME'] or 'localhost:8000'
    SECRET_KEY = os.environ['SECRET_KEY'] or 'have-fun'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL')
    RESULTS_PER_PAGE = 10
