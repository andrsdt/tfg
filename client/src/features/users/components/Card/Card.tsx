import clsx from 'clsx';
import Avatar from '../Avatar/Avatar';
import { User } from '../../types/users';

type UserCardProps = {
  user: User;
  className?: string;
};

export const UserCard = ({ user, className = '' }: UserCardProps) => (
  <div className={clsx('flex items-center space-x-2', className)}>
    <Avatar src={user.photo} alt={user.first_name} className="w-14" />
    <div>
      <h3 className="ml-0.5 text-lg font-semibold">
        {user.first_name} {user.last_name}
      </h3>
      <p>
        ⭐ {4.8} &middot; {14} valoraciones
      </p>
    </div>
  </div>
);
