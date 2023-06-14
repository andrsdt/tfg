import NEXT_ROUTES from '@/constants/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { BasicUser } from '../../types/users';
import { Avatar } from '../Avatar';
import { Rating } from './Rating';

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
        <Rating user={user} />
      </div>
    </Link>
  </button>
);
