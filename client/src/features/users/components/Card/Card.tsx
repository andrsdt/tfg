import clsx from 'clsx';
import Avatar from '../Avatar/Avatar';

type UserCardProps = {
  // TODO: Define user type
  user: any;
  className?: string;
};

export const UserCard = ({ user, className = '' }: UserCardProps) => (
  <div className={clsx('flex items-center space-x-2', className)}>
    <Avatar src={user.avatar} alt={user.name} className="w-14" />
    <div>
      <h3 className="ml-0.5 text-lg font-semibold">{user.name}</h3>
      <p>
        ⭐ {4.8} &middot; {14} valoraciones
      </p>
    </div>
  </div>
);
