from django_filters import rest_framework

from .models import Listing


class ListingFilterSet(rest_framework.FilterSet):
    # Filter by title (contains)
    title = rest_framework.CharFilter(field_name="title", lookup_expr="icontains")
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

    # Filter by those that don't contain any of the allergens
    allergens = rest_framework.CharFilter(
        # Allergens will be a comma separated string of the allergens we want to exclude
        method="filter_out_allergens"
    )

    # Filter by features (contains) by features__feature__exact
    features = rest_framework.CharFilter(
        method="filter_by_features",
    )

    order_by = rest_framework.OrderingFilter(
        fields=(
            ("price_per_unit", "price"),
            ("available_quantity", "available_quantity"),
            ("created_at", "created_at"),
            ("updated_at", "updated_at"),
        )
    )

    class Meta:
        model = Listing
        fields = [
            "title",
            "price_min",
            "price_max",
            "available_quantity_min",
            "available_quantity_max",
            "unit",
            "producer",
            "allergens",
            "features",
        ]

    def filter_out_allergens(self, queryset, _, value):
        allergens = value.split(",")  # GLUTEN, DAIRY, LACTOSE...
        for allergen in allergens:
            queryset = queryset.exclude(allergens__allergen__exact=allergen)
        return queryset

    def filter_by_features(self, queryset, _, value):
        features = value.split(",")  # ALLOWS_PICKUP, IS_VEGAN...
        for feature in features:
            print("Filtering by ", feature)
            queryset = queryset.filter(features__feature__exact=feature)
        return queryset
