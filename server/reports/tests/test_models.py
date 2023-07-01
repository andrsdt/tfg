from reviews.models import Review
from django.core.exceptions import ValidationError

import pytest

"""
Code Analysis

Main functionalities:
The Review class is responsible for storing reviews made by users on orders they have placed. It is related to the Order class through a one-to-one relationship, meaning that each order can have at most one review. The class stores the rating given by the user and an optional comment.

Methods:
- from_user(user): returns all reviews made by a given user.

Fields:
- order: a one-to-one relationship with the Order class, representing the order that the review is related to.
- rating: a positive integer representing the rating given by the user.
- comment: an optional text field with a maximum length of 150 characters, representing the comment made by the user.
"""


@pytest.mark.django_db
class TestReview:
    # Tests that a review can be created with valid input
    def test_create_review_valid_input(self, order):
        review = Review.objects.create(order=order, rating=4, comment="Good product")
        assert review in Review.objects.all()

    # Tests that a review can be retrieved with valid input
    def test_retrieve_review_valid_input(self, order):
        review = Review.objects.create(order=order, rating=4, comment="Good product")
        assert review == Review.objects.get(order=order)

    # Tests that an error is raised when retrieving a non-existent review
    def test_retrieve_review_nonexistent(self):
        with pytest.raises(Review.DoesNotExist):
            Review.objects.get(order_id=999)

    # Tests that a review can be created with a null comment
    def test_create_review_null_comment(self, order):
        review = Review.objects.create(order=order, rating=4, comment=None)
        assert review in Review.objects.all()
        assert review.comment is None

    # Tests that a review can be created with a non-null comment
    def test_create_review_nonnull_comment(self, order):
        review = Review.objects.create(order=order, rating=4, comment="Great product!")
        assert review in Review.objects.all()
        assert review.comment == "Great product!"

    # Tests that a review can be retrieved with a related order
    def test_retrieve_review_related_order(self, order):
        review = Review.objects.create(order=order, rating=4, comment=None)
        assert review in Review.objects.all()
        assert review.order == order
