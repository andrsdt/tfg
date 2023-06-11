import pytest
from reviews.business_logic import create_review


@pytest.mark.django_db
class TestCreateReview:
    # Tests that a review can be created with a valid order and rating
    def test_happy_path_create_review(self, order):
        # Arrange
        rating = 4
        comment = "This is a comment"

        # Act
        review = create_review(order, rating, comment)

        # Assert
        assert review.order == order
        assert review.rating == rating
        assert review.comment == comment

    # Tests that a review can be created without a comment
    def test_happy_path_create_review_no_comment(self, order):
        # Arrange
        rating = 3
        comment = None

        # Act
        review = create_review(order, rating, comment)

        # Assert
        assert review.order == order
        assert review.rating == rating
        assert review.comment is None
