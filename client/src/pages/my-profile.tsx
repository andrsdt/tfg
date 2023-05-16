import { LayoutWithNavbar } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import Avatar from '@/features/users/components/Avatar/Avatar';
import {
  ProfileBox,
  ProfileButton,
} from '@/features/users/components/Button/ProfileBox';
import { useAuth } from '@/hooks/useAuth';
import {
  ArrowLeftOnRectangleIcon,
  CakeIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

const Profile = () => {
  const { user, logout } = useAuth({ roles: [ROLES.AUTHENTICATED] });

  // TODO: skeleton loading for user
  if (!user) return <></>;

  return (
    <LayoutWithNavbar className="flex flex-col items-center px-4 pb-4 pt-6">
      {/* TODO: editable avatar component, that has the camera button and the logic behind */}
      <Avatar src={user.photo} alt={user.first_name} className="w-32" />
      <h1 className="mt-2 text-2xl font-bold">
        {user.first_name} {user.last_name}
      </h1>
      <h2 className="text-xl">⭐ 4.8 &middot; 14 valoraciones</h2>
      {/* NOTE: this is working because producer uses the user.id as its PK too */}
      {user.is_producer && (
        <Link
          href={NEXT_ROUTES.PRODUCER_PROFILE(user.pk)}
          className="mt-1 text-gray underline"
        >
          Ver perfil público
        </Link>
      )}
      <div className="mt-8 flex w-full flex-col space-y-4">
        <ProfileBox>
          <ProfileButton
            title="Mis movimientos"
            Icon={<WalletIcon />}
            href=""
          />
        </ProfileBox>
        <ProfileBox>
          <ProfileButton title={user.email} Icon={<EnvelopeIcon />} href="" />
          <ProfileButton title="+34 601 928 332" Icon={<PhoneIcon />} href="" />
          <ProfileButton
            title="12 de enero de 1961"
            Icon={<CakeIcon />}
            href=""
          />
          <ProfileButton
            title="Cambiar contraseña..."
            Icon={<LockClosedIcon />}
            href=""
          />
        </ProfileBox>
        <ProfileBox>
          <ProfileButton
            title="Ayuda"
            Icon={<QuestionMarkCircleIcon />}
            href=""
          />
          <ProfileButton
            title="Cerrar sesión"
            Icon={<ArrowLeftOnRectangleIcon />}
            onClick={logout}
            href=""
          />
        </ProfileBox>
      </div>
    </LayoutWithNavbar>
  );
};

export default Profile;
