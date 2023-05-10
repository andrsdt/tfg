import { LayoutWithNavbar } from '@/components/Layouts';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const Profile = () => {
  const {
    query: { id },
  } = useRouter();

  const { logout } = useAuth();
  return (
    <LayoutWithNavbar>
      THIS IS THE PROFILE OF AN USER WITH ID {id}
      <button onClick={logout}>logout</button>
    </LayoutWithNavbar>
  );
};

export default Profile;
