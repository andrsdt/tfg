import NEXT_ROUTES from '@/constants/routes';
import { ExternalAuth } from '@/features/auth/components/ExternalAuth';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Farm from '/public/illustrations/farm.svg';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';

const Signup = () => {
  useAuth({ roles: [ROLES.GUEST] });

  return (
    <BaseLayout className="flex flex-col justify-start">
      <span className="flex w-full justify-center overflow-x-hidden">
        <Farm className="origin-bottom" />
      </span>
      <div className="absolute bottom-0 z-10 -mt-4 w-full rounded-t-3xl bg-light-gray text-center">
        <p className="pb-8 pt-4 text-3xl text-gray">Crear cuenta nueva</p>
        <div className="-mt-4 rounded-t-3xl bg-white p-5">
          <ExternalAuth />
          <SignupForm className="py-4" />
          <p className="inline-block font-light text-gray">
            ¿Ya tienes una cuenta?
          </p>
          <Link href={NEXT_ROUTES.LOGIN} className="font-semibold text-green">
            &nbsp;Inicia sesión
          </Link>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Signup;
