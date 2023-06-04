from django.contrib.gis.db.models.functions import Distance
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

    distance_order = rest_framework.CharFilter(method="order_by_distance")

    favorite = rest_framework.BooleanFilter(method="filter_by_favorite")

    order_by = rest_framework.OrderingFilter(
        fields=(
            ("price_per_unit", "price"),
            ("available_quantity", "quantity"),
            ("created_at", "created_at"),
            ("updated_at", "updated_at"),
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

    def filter_by_distance(self, queryset, _, value):
        user = self.request.user
        if not value or user.is_anonymous or user.location is None:
            return queryset.none()

        # Filter by those in a radius of "value" meters
        return queryset.filter(
            producer__user__location__distance_lte=(
                user.location,  # POINT(X Y)
                DistanceRadius(m=int(value)),
            )
        )

    def filter_exclude_mine(self, queryset, _, value):
        user = self.request.user
        if not value or user.is_anonymous or not user.is_producer:
            return queryset

        return queryset.exclude(producer__user=user)

    def order_by_distance(self, queryset, _, value):
        user = self.request.user
        if value not in ["asc", "desc"] or user.is_anonymous or not user.location:
            return queryset

        queryset = queryset.annotate(
            distance=Distance(F("producer__user__location"), user.location)
        )
        return queryset.order_by("distance" if value == "asc" else "-distance")
