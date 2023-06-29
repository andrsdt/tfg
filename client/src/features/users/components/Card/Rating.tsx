import clsx from 'clsx';
import { AnyUser } from '../../types/users';

type RatingProps = { user: AnyUser; className?: string };

export const Rating = ({ user, className }: RatingProps) => {
  const ratingMessage =
    user.number_ratings === 1 ? 'valoración' : 'valoraciones';

  return (
    <p className={clsx(className)}>
      {user.average_rating
        ? `⭐ ${user.average_rating.toFixed(1)} · ${
            user.number_ratings
          } ${ratingMessage}`
        : 'No hay valoraciones'}
    </p>
  );
};
