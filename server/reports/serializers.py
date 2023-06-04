from reports.models import Report
from rest_framework import serializers
from users.models import User


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]


class ReportCreateSerializer(serializers.ModelSerializer):
    reporter = serializers.HiddenField(default=serializers.CurrentUserDefault())
    reported = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False
    )

    class Meta:
        model = Report
        fields = "__all__"
        read_only_fields = ["is_resolved", "reporter", "id", "created_at", "updated_at"]

    def validate_order(self, order):
        if order.consumer != self.context["request"].user:
            raise serializers.ValidationError(
                "Un pedido sólo puede ser reportado por su comprador"
            )
        return order

    def get_reported(self, reported):
        return reported

    # If the report is about an order, then "reported" will be autofilled with the
    # seller of that order to ensure consistency. Otherwise, it will be taken from the
    # request data (it would be the case of an user who reports another one without an
    # order involved).
    def validate(self, data):
        if data.get("order"):
            data["reported"] = data["order"].listing.producer.user
        if data.get("reported") is None:
            raise serializers.ValidationError("El usuario a reportar es obligatorio")
        return data
