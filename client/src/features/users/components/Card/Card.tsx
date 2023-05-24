import NEXT_ROUTES from '@/constants/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { BasicUser } from '../../types/users';
import { Avatar } from '../Avatar';

type UserCardProps = {
  user: BasicUser;
  className?: string;
};

export const UserCard = ({ user, className = '' }: UserCardProps) => (
  <button>
    <Link
      href={NEXT_ROUTES.PRODUCER_PROFILE(user.id)}
      className={clsx('flex items-center space-x-2 text-start', className)}
    >
      <Avatar src={user.photo} alt={user.first_name} className="w-14" />
      <div>
        <h3 className="text-lg font-semibold">
          {user.first_name} {user.last_name}
        </h3>
        <p>
          {user.average_rating
            ? `⭐ ${user.average_rating.toFixed(1)} · ${
                user.number_ratings
              } valoraciones`
            : 'No hay valoraciones'}
        </p>
      </div>
    </Link>
  </button>
);
