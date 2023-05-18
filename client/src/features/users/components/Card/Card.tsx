import clsx from 'clsx';
import Avatar from '../Avatar/Avatar';
import { User } from '../../types/users';
import Link from 'next/link';
import NEXT_ROUTES from '@/constants/routes';

type UserCardProps = {
  user: User;
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
        <h3 className="ml-0.5 text-lg font-semibold">
          {user.first_name} {user.last_name}
        </h3>
        <p>
          ⭐ {4.8} &middot; {14} valoraciones
        </p>
      </div>
    </Link>
  </button>
);
