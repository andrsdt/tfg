import os

from decouple import config
from dj_database_url import parse as db_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=False, cast=bool)


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Developer Apps
    "authentication",
    "grocerin",
    "users",
    "producers",
    "consumers",
    "listings",
    "orders",
    # Third-party packages
    "drf_spectacular",
    "drf_standardized_errors",
    "rest_framework",
    "django_phonenumbers",
    "phonenumber_field",
    "django_cleanup.apps.CleanupConfig",
    # Auth modules
    "rest_framework.authtoken",
    "dj_rest_auth",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth.registration",
]

# Custom user model
AUTH_USER_MODEL = "users.User"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "grocerin.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "grocerin.wsgi.application"


DATABASES = {
    "default": config(
        "DATABASE_URL",
        default="sqlite:///" + os.path.join(BASE_DIR, "db.sqlite3"),
        cast=db_url,
    )
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


REST_FRAMEWORK = {
    # Default permission classes
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    # Authentication
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "EXCEPTION_HANDLER": "drf_standardized_errors.handler.exception_handler",
    "USER_DETAILS_SERIALIZER": "authentication.serializers.CustomUserDetailsSerializer",
    "LOGIN_SERIALIZER": "authentication.serializers.CustomLoginSerializer",
    "REGISTER_SERIALIZER": "authentication.serializers.CustomRegisterSerializer",
}

REST_AUTH = {
    "LOGIN_SERIALIZER": REST_FRAMEWORK["LOGIN_SERIALIZER"],
    "REGISTER_SERIALIZER": REST_FRAMEWORK["REGISTER_SERIALIZER"],
    "USER_DETAILS_SERIALIZER": REST_FRAMEWORK["USER_DETAILS_SERIALIZER"],
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Grocerin API",
    "VERSION": "1.0.0",
    "SCHEMA_PATH_PREFIX": r"/api/v[0-9]",
    "SCHEMA_PATH_PREFIX_TRIM": True,
    "SERVE_INCLUDE_SCHEMA": False,
    "SERVERS": [
        {
            "url": "http://grocerin.test/api/v1",
            "description": "Local development server",
        },
    ],
    "COMPONENT_SPLIT_REQUEST": True,  # allow file upload
}


# Dj-rest-auth and all-auth config
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_VERIFICATION = "optional"
LOGIN_REDIRECT_URL = "/"
REST_USE_JWT = True
JWT_AUTH_COOKIE = "auth"

# NOTE: If we don't add this, we get a 403 error when sending petitions
# once we are logged in. I don't know why this happens, given that we are
# sending them from the same domain bc we are using nginx
CSRF_TRUSTED_ORIGINS = [
    "http://*.localhost",
    "http://grocerin.test",
]


ALLOWED_HOSTS = ["*"]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

MEDIA_ROOT = os.path.join(BASE_DIR, "files")
STATIC_ROOT = os.path.join(BASE_DIR, "/static/")
MEDIA_URL = "/media/"
STATIC_URL = "/static/"

# https://ubuntu.com/blog/django-behind-a-proxy-fixing-absolute-urls
# Setup support for proxy headers
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
