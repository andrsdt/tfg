import { LayoutWithNavbar } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { EditableAvatar } from '@/features/users/components/Avatar/EditableAvatar';
import {
  ProfileBox,
  ProfileButton,
} from '@/features/users/components/Button/ProfileBox';
import { useAuth } from '@/hooks/useAuth';
import { formatSpanishPhoneNumber } from '@/utils/formatters';
import {
  ArrowLeftOnRectangleIcon,
  BanknotesIcon,
  ClipboardIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const Profile = () => {
  const { user, logout } = useAuth({ roles: [ROLES.AUTHENTICATED] });

  // TODO: skeleton loading for user
  if (!user) return <></>;

  return (
    <LayoutWithNavbar className="flex flex-col items-center px-4 pb-4 pt-6">
      <EditableAvatar user={user} />
      <h1 className="mt-2 text-2xl font-bold">
        {user.first_name} {user.last_name}
      </h1>
      {user.is_producer && (
        <>
          <h2 className="text-xl">
            {user.average_rating
              ? `⭐ ${user.average_rating.toFixed(1)} · ${
                  user.number_ratings
                } valoraciones`
              : 'No hay valoraciones'}
          </h2>
          {/* NOTE: this is working because producer uses the user.id as its PK too */}
          <Link
            href={NEXT_ROUTES.PRODUCER_PROFILE(user.pk)}
            className="mt-1 text-gray underline"
          >
            Ver perfil público
          </Link>
        </>
      )}
      <div className="mt-8 flex w-full flex-col space-y-4">
        {!user.has_completed_onboarding && (
          <div className="flex w-full flex-col space-y-3 rounded-2xl bg-yellow p-3">
            <Link
              className="flex w-full justify-between rounded-2xl bg-light-yellow px-6 py-4 text-black"
              href={NEXT_ROUTES.COMPLETE_ONBOARDING}
            >
              <span className="flex items-center text-lg">
                <ExclamationCircleIcon className="mr-2 w-8" />
                Termina de completar tu perfil
              </span>
            </Link>
          </div>
        )}
        <ProfileBox>
          {user.is_producer && (
            <>
              <ProfileButton
                title="Mis publicaciones"
                Icon={<RectangleStackIcon />}
                href={NEXT_ROUTES.MY_LISTINGS}
              />
              <ProfileButton
                title="Mis ventas"
                Icon={<BanknotesIcon />}
                href={NEXT_ROUTES.MY_SALES}
              />
            </>
          )}
          <ProfileButton
            title="Mis compras"
            Icon={<ClipboardIcon />}
            href={NEXT_ROUTES.MY_PURCHASES}
          />
        </ProfileBox>
        <ProfileBox>
          {/* TODO: implement profile general editing */}
          <ProfileButton title={user.email} Icon={<EnvelopeIcon />} href="" />
          {user.phone && (
            <ProfileButton
              title={formatSpanishPhoneNumber(user.phone)}
              Icon={<PhoneIcon />}
              href=""
            />
          )}
          {/* <ProfileButton
            title="12 de enero de 1961"
            Icon={<CakeIcon />}
            href=""
          /> */}
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
