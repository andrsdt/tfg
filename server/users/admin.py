from django.contrib import admin
from listings.models import Listing

from .models import User


@admin.action(description="Ban selected users")
def ban_user(modeladmin, request, queryset):
    if queryset.filter(is_staff=True).exists():
        modeladmin.message_user(request, "You can't ban a staff member", level="ERROR")
        return
    queryset.update(is_active=False)

    # Get all listings from these producers and set them to inactive
    users = queryset.filter(producer__isnull=False)  # List of users who are producers
    producers = [user.producer for user in users]  # List of producers
    listings = Listing.objects.filter(producer__in=producers)
    listings.update(is_active=False)


@admin.action(description="Unban selected users")
def unban_user(modeladmin, request, queryset):
    queryset.update(is_active=True)


class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "first_name", "last_name", "is_active")
    list_filter = ("is_staff", "is_active")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("created_at",)
    actions = [ban_user, unban_user]


admin.site.register(User, UserAdmin)
