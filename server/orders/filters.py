from django_filters import rest_framework

from .models import Order


class OrderFilterSet(rest_framework.FilterSet):
    role = rest_framework.ChoiceFilter(
        choices=(
            ("PRODUCER", "PRODUCER"),
            ("CONSUMER", "CONSUMER"),
        ),
        method="filter_by_role",
    )

    class Meta:
        model = Order
        fields = ("role",)

    def filter_by_role(self, queryset, _, value):
        requester = self.request.user
        querysets = {
            "PRODUCER": queryset.filter(listing__producer__user=requester),
            "CONSUMER": queryset.filter(consumer=requester),
        }
        return querysets.get(value, queryset)
