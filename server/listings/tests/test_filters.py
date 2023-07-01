from listings.models import Listing
from listings.filters import ListingFilterSet
from django.test import RequestFactory

import pytest

"""
Code Analysis

Main functionalities:
The ListingFilterSet class is a Django FilterSet that allows filtering of Listing objects based on various criteria. It provides filters for searching by title or description, filtering by price and available quantity, filtering by unit and producer, excluding listings that contain certain allergens, filtering by features, filtering by distance from a given location, and filtering by whether a listing is a favorite of the current user. It also allows ordering of results by various fields.

Methods:
- fuzzy_search: filters listings by searching for a given string in the title or description
- filter_out_allergens: excludes listings that contain any of a given list of allergens
- filter_by_features: filters listings by whether they have a given list of features
- filter_by_favorite: filters listings by whether they are a favorite of the current user
- filter_by_location: filters listings by distance from a given location
- filter_by_distance: filters listings by distance from a given location
- filter_exclude_mine: excludes listings that were posted by the current user

Fields:
- q: search string for title or description
- price_min, price_max: minimum and maximum price per unit
- available_quantity_min, available_quantity_max: minimum and maximum available quantity
- unit: unit of measurement
- producer: producer of the listing
- allergens: comma-separated list of allergens to exclude
- features: comma-separated list of features to filter by
- distance: distance in meters to filter by
- location: location to filter by
- favorite: whether to filter by favorites of the current user
- order_by: field to order results by
"""


@pytest.mark.django_db
class TestListingFilterSet:
    # Tests that the queryset is filtered by title or description when 'q' parameter is provided
    def test_filter_by_title_or_description(self, producer):
        # Arrange
        Listing.objects.create(
            title="Test Title",
            description="Test Description",
            price_per_unit=10,
            available_quantity=10,
            unit="kg",
            producer=producer,
        )
        Listing.objects.create(
            title="Another Title",
            description="Another Description",
            price_per_unit=10,
            available_quantity=10,
            unit="kg",
            producer=producer,
        )
        filter_set = ListingFilterSet(data={"q": "Test"})

        # Act
        queryset = filter_set.qs

        # Assert
        assert queryset.count() == 1
        assert queryset.first().title == "Test Title"

    # Tests that an empty queryset is returned when 'features' parameter contains all possible features
    def test_empty_queryset_all_features(self):
        # Arrange
        request = RequestFactory().get("/api/v1/listings")
        filter_params = {"features": "ALLOWS_PICKUP,ALLOWS_DELIVERY,IS_VEGAN,IS_FROZEN"}
        filterset = ListingFilterSet(
            data=filter_params, queryset=Listing.objects.all(), request=request
        )

        # Act
        filtered_queryset = filterset.qs

        # Assert
        assert len(filtered_queryset) == 0

    # Tests that an empty queryset is returned when 'distance' parameter is 0
    def test_empty_queryset_distance_zero(self):
        # Arrange
        request = RequestFactory().get("/api/v1/listings")
        filter_params = {"distance": 0}
        filterset = ListingFilterSet(
            data=filter_params, queryset=Listing.objects.all(), request=request
        )

        # Act
        filtered_queryset = filterset.qs

        # Assert
        assert len(filtered_queryset) == 0

    # Tests that an empty queryset is returned when 'location' parameter is not provided
    def test_empty_queryset_no_location(self):
        # Arrange
        request = RequestFactory().get("/api/v1/listings")
        filter_params = {"location": None}
        filterset = ListingFilterSet(
            data=filter_params, queryset=Listing.objects.all(), request=request
        )

        # Act
        filtered_queryset = filterset.qs

        # Assert
        assert len(filtered_queryset) == 0
