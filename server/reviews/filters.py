from django_filters import rest_framework

from .models import Review


class ReviewFilterSet(rest_framework.FilterSet):
    producer = rest_framework.CharFilter(
        field_name="order__listing__producer__user__id", lookup_expr="iexact"
    )

    class Meta:
        model = Review
        fields = ("producer",)
