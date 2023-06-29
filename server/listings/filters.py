from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.measure import Distance as DistanceRadius
from django.db.models import F, Q
from django_filters import rest_framework
from listings.enums import DISTANCE_CHOICES

from .models import Listing


class ListingFilterSet(rest_framework.FilterSet):
    # Filter by matching title or description
    q = rest_framework.CharFilter(method="fuzzy_search")

    # Filter by price (gte, lte)
    price_min = rest_framework.NumberFilter(
        field_name="price_per_unit", lookup_expr="gte"
    )
    price_max = rest_framework.NumberFilter(
        field_name="price_per_unit", lookup_expr="lte"
    )
    # Filter by available quantity (gte, lte)
    available_quantity_min = rest_framework.NumberFilter(
        field_name="available_quantity", lookup_expr="gte"
    )
    available_quantity_max = rest_framework.NumberFilter(
        field_name="available_quantity", lookup_expr="lte"
    )
    # Filter by unit (exact)
    unit = rest_framework.CharFilter(field_name="unit", lookup_expr="exact")
    # Filter by producer (exact)
    producer = rest_framework.CharFilter(field_name="producer", lookup_expr="exact")
    exclude_mine = rest_framework.BooleanFilter(method="filter_exclude_mine")

    # Filter by active (exact)
    is_active = rest_framework.BooleanFilter(
        field_name="is_active", lookup_expr="exact"
    )

    # Filter by those that don't contain any of the allergens
    allergens = rest_framework.CharFilter(
        # Allergens will be a comma separated string of the allergens we want to exclude
        method="filter_out_allergens"
    )

    # Filter by features (contains) by features__feature__exact
    features = rest_framework.CharFilter(
        method="filter_by_features",
    )

    distance = rest_framework.ChoiceFilter(
        choices=DISTANCE_CHOICES, method="filter_by_distance"
    )

    location = rest_framework.CharFilter(method="filter_by_location")

    favorite = rest_framework.BooleanFilter(method="filter_by_favorite")

    order_by = rest_framework.OrderingFilter(
        fields=(
            ("created_at", "created_at"),
            ("updated_at", "updated_at"),
            ("available_quantity", "quantity"),
            ("price_per_unit", "price"),
        )
    )

    class Meta:
        model = Listing
        fields = [
            "q",
            "price_min",
            "price_max",
            "available_quantity_min",
            "available_quantity_max",
            "unit",
            "producer",
            "allergens",
            "features",
            "distance",
            "favorite",
        ]

    def fuzzy_search(self, queryset, _, value):
        """Return all listings that contain the value either in the title or in the description"""
        return queryset.filter(
            Q(title__icontains=value) | Q(description__icontains=value)
        )

    def filter_out_allergens(self, queryset, _, value):
        allergens = value.split(",")  # GLUTEN, DAIRY, LACTOSE...
        for allergen in allergens:
            queryset = queryset.exclude(allergens__allergen__exact=allergen)

        return queryset

    def filter_by_features(self, queryset, _, value):
        features = value.split(",")  # ALLOWS_PICKUP, IS_VEGAN...
        for feature in features:
            queryset = queryset.filter(features__feature__exact=feature)

        return queryset

    def filter_by_favorite(self, queryset, _, value):
        user = self.request.user
        if not value or user.is_anonymous:
            return queryset.none()

        return queryset.filter(pk__in=user.favorites.values_list("id", flat=True))

    def filter_by_location(self, queryset, _, value):
        distance = self.request.query_params.get("distance", 10000)
        return self.filter_by_distance(queryset, _, distance)

    def filter_by_distance(self, queryset, _, value):
        user = self.request.user
        device_location_wkt = self.request.query_params.get("location", None)
        device_location = (
            GEOSGeometry(device_location_wkt) if device_location_wkt else None
        )
        user_location = user.location if user.is_authenticated else None
        location = device_location or user_location

        if not value or not location:
            return queryset.none()

        # If the user shares their device's location, use that instead of
        # their profile's location, which they may not have set or may not
        # reflect where they are right now.

        # Filter by those in a radius of "value" meters and return in order of ascending distance
        filtered_by_distance = queryset.filter(
            producer__user__location__distance_lte=(
                location,  # POINT(X Y)
                DistanceRadius(m=int(value)),
            )
        )

        ordered_by_distance = filtered_by_distance.annotate(
            distance=Distance(F("producer__user__location"), location)
        )

        return ordered_by_distance.order_by("distance")

    def filter_exclude_mine(self, queryset, _, value):
        user = self.request.user
        if not value or user.is_anonymous or not user.is_producer:
            return queryset

        return queryset.exclude(producer__user=user)
