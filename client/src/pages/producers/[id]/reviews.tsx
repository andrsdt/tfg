import { BackButton, Separator } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import NEXT_ROUTES from '@/constants/routes';
import { listReviews } from '@/features/reviews/api/list';
import { ReviewCard } from '@/features/reviews/components/Card';
import { Review } from '@/features/reviews/types/reviews';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { groupBy } from '@/utils/transformations';
import { uuid } from '@/utils/uuid';
import router from 'next/router';

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

type ProducerReviewsProps = {
  pageProps: {
    id: string;
  };
};

const ProducerReviews = ({ pageProps }: ProducerReviewsProps) => {
  const { id } = pageProps;
  const [reviews] = useRetrieveHandler<Review[], Review[]>(
    () => listReviews(id),
    {
      onError: () => router.replace(NEXT_ROUTES.HOME),
    }
  );

  const reviewsByYear = groupBy(reviews, (review) =>
    new Date(review.created_at).getFullYear().toString()
  );

  if (!reviews) return <>Loading...</>;

  return (
    <BaseLayout className="p-4">
      <span className="mb-4 flex h-min items-center space-x-3">
        <BackButton
          className="h-8 w-8"
          href={NEXT_ROUTES.PRODUCER_PROFILE(id)}
        />
        <h1 className="text-3xl font-bold">Reseñas del productor</h1>
      </span>
      {Object.entries(reviewsByYear || {})
        ?.reverse()
        .map(([year, reviews]) => (
          <div key={year} className="mb-3">
            <h2 className="mb-4 text-4xl font-extrabold">{year}</h2>
            {reviews?.map((review) => (
              <>
                <ReviewCard key={review.id} review={review} />
                <Separator key={uuid()} className="mb-6 mt-4" />
              </>
            ))}
          </div>
        ))}
    </BaseLayout>
  );
};

export default ProducerReviews;
