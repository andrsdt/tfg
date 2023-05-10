# from allauth.account.utils import setup_user_email
# from consumers.models import Consumer
# from users.models import User


def create_account(email, password, first_name, last_name, request=None):
    """
    Create a new user account.
    """
    # this calls manager.py's create() method, which is inherited from the original UserManager
    # user = User.objects.create(
    #     email=email,
    #     password=password,
    #     first_name=first_name,
    #     last_name=last_name,
    # )

    # SIDE EFFECT: create the EmailAddress instance (auth library feature)
    # setup_user_email(request, user, [])

    # SIDE EFFECT: Also create the associated consumer
    # consumer = Consumer.objects.create(user=user)
    # user.consumer = consumer

    # return user
    pass
