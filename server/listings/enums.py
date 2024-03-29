PRODUCT_UNIT_CHOICES = (("KG", "kilogram"), ("UNIT", "unitary"))

PRODUCT_ALLERGEN_CHOICES = (
    ("LACTOSE", "lactose"),
    ("WHEAT", "wheat"),
    ("NUTS", "nuts"),
    ("CELERY", "celery"),
    ("CRUSTACEANS", "crustaceans"),
    ("EGG", "egg"),
    ("FISH", "fish"),
    ("GLUTEN", "gluten"),
    ("LUPINS", "lupins"),
    ("MILK", "milk"),
    ("MOLLUSKS", "mollusks"),
    ("MUSTARD", "mustard"),
    ("PEANUTS", "peanuts"),
    ("SESAME", "sesame"),
    ("SOYBEANS", "soybeans"),
    ("SULPHITES", "sulphites"),
)

PRODUCT_FEATURE_CHOICES = (
    ("ALLOWS_DELIVERY", "allows_delivery"),
    ("ALLOWS_PICKUP", "allows_pickup"),
    ("IS_FROZEN", "is_frozen"),
    ("IS_VEGAN", "is_vegan"),
    ("IS_SUGAR_FREE", "is_sugar_free"),
)

DISTANCE_CHOICES = (
    ("1000", "<1 km"),
    ("5000", "<5 km"),
    ("10000", "<10 km"),
    ("50000", "<50 km"),
    ("100000", "<100 km"),
)
