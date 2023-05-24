from django_filters import rest_framework

from .models import Conversation


class ChatFilterSet(rest_framework.FilterSet):
    listing = rest_framework.CharFilter(field_name="listing", lookup_expr="exact")

    class Meta:
        model = Conversation
        fields = [
            "listing",
        ]
