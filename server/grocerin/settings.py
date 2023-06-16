import os

from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=False, cast=bool)


# Application definition
INSTALLED_APPS = [
    # Don't put "channels", only "daphne"
    #
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.gis",
    # Developer Apps
    "authentication",
    "grocerin",
    "users",
    "producers",
    "listings",
    "orders",
    "notifications",
    "chats",
    "reviews",
    "reports",
    # Third-party packages
    "drf_spectacular",
    "drf_standardized_errors",
    "rest_framework",
    "rest_framework_gis",
    "django_phonenumbers",
    "phonenumber_field",
    "django_cleanup.apps.CleanupConfig",
    # "django_extensions", # TODO: delete this when we are done with graph exports
    # Auth modules
    "rest_framework.authtoken",
    "dj_rest_auth",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.facebook",
    "allauth.socialaccount.providers.twitter",
    "allauth.socialaccount.providers.instagram",
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
    "django.middleware.locale.LocaleMiddleware",
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
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": config("DB_NAME"),
        "USER": config("DB_USER"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config("DB_HOST"),
        "PORT": config("DB_PORT"),
    }
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
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
    "EXCEPTION_HANDLER": "drf_standardized_errors.handler.exception_handler",
    "USER_DETAILS_SERIALIZER": "authentication.serializers.CustomUserDetailsSerializer",
    "LOGIN_SERIALIZER": "authentication.serializers.CustomLoginSerializer",
    "REGISTER_SERIALIZER": "authentication.serializers.CustomRegisterSerializer",
    # update serializer
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
            "url": "http://grocerin.es/api/v1",
            "description": "Local development server",
        },
    ],
    "COMPONENT_SPLIT_REQUEST": True,  # allow file upload
}

# Email sending config
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_FROM = config("EMAIL_HOST_USER")
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
EMAIL_PORT = config("EMAIL_PORT", cast=int)
EMAIL_USE_TLS = config("EMAIL_USE_TLS", cast=bool)
EMAIL_USE_SSL = config("EMAIL_USE_SSL", cast=bool)

# Dj-rest-auth and all-auth config
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = "/"
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
LOGIN_REDIRECT_URL = "/"
REST_USE_JWT = True
JWT_AUTH_COOKIE = "auth"

# Social login config
SOCIALACCOUNT_ADAPTER = "grocerin.adapters.SocialAccountAdapter"
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

SITE_ID = 2
SOCIALACCOUNT_QUERY_EMAIL = True
ACCOUNT_LOGOUT_ON_GET = True
ACCOUNT_UNIQUE_EMAIL = True
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        # For each OAuth based provider, either add a ``SocialApp``
        # (``socialaccount`` app) containing the required client
        # credentials, or list them here:
        "APP": {
            "client_id": config("GOOGLE_CLIENT_ID"),
            "secret": config("GOOGLE_CLIENT_SECRET"),
            "key": "",
        },
        "SCOPE": ["profile", "email"],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
    },
    "facebook": {
        "APP": {
            "client_id": config("FACEBOOK_CLIENT_ID"),
            "secret": config("FACEBOOK_CLIENT_SECRET"),
            "key": "",
        },
        "METHOD": "oauth2",
        "SCOPE": ["email", "public_profile"],
        "AUTH_PARAMS": {"auth_type": "reauthenticate"},
        "FIELDS": [
            "id",
            "email",
            "name",
            "first_name",
            "last_name",
        ],
        "EXCHANGE_TOKEN": True,
        "LOCALE_FUNC": lambda request: "kr_KR",
        # 'VERIFIED_EMAIL': False,
        "VERSION": "v2.4",
    },
    "instagram": {
        "APP": {
            "client_id": config("INSTAGRAM_CLIENT_ID"),
            "secret": config("INSTAGRAM_CLIENT_SECRET"),
            "key": "",
        },
        "METHOD": "oauth2",
    },
    "twitter": {
        "APP": {
            "client_id": config("TWITTER_CLIENT_ID"),
            "secret": config("TWITTER_CLIENT_SECRET"),
            "key": "",
        },
    },
}

# NOTE: If we don't add this, we get a 403 error when sending petitions
# once we are logged in. I don't know why this happens, given that we are
# sending them from the same domain bc we are using nginx
CSRF_TRUSTED_ORIGINS = [
    "http://*.localhost",
    "http://grocerin.es",
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

# PostGIS
GDAL_LIBRARY_PATH = config("GDAL_LIBRARY_PATH", default=None)
GEOS_LIBRARY_PATH = config("GEOS_LIBRARY_PATH", default=None)

# Channels
ASGI_APPLICATION = "chats.routing.application"  # routing.py will handle the ASGI
# TODO: Change this to redis in production
CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}

# TODO: delete this when we are done with graph exports
# GRAPH_MODELS = {
#     "all_applications": True,
#     "group_models": True,
#     "include_models": [
#         "User",
#         "Producer",
#         "Listing",
#         "ListingImage",
#         "ProductAllergen",
#         "ProductFeature",
#         "Order",
#         "Notification",
#         "Conversation",
#         "Message",
#         "Review",
#         "Report",
#     ],
# }
