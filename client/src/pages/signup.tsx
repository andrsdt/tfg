import NEXT_ROUTES from '@/constants/routes';
import { ExternalAuth } from '@/features/auth/components/ExternalAuth';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Farm from '/public/illustrations/farm.svg';
import { BaseLayout } from '@/components/Layouts';

const Signup = () => {
  useAuth({ middleware: ['guest'] });

  return (
    <BaseLayout className="flex h-full flex-col justify-start">
      <span className="flex w-full justify-center overflow-x-hidden">
        <Farm className="origin-bottom" />
      </span>
      <div className="-mt-4 rounded-t-3xl bg-light-gray text-center z-10 absolute bottom-0 w-full">
        <p className="pt-4 pb-8 text-3xl text-gray">Crear cuenta nueva</p>
        <div className="-mt-4 rounded-t-3xl bg-white p-5">
          <ExternalAuth />
          <SignupForm className="py-4" />
          <p className="inline-block font-light text-gray">
            ¿Ya tienes una cuenta?
          </p>
          <Link href={NEXT_ROUTES.LOGIN}>&nbsp;Inicia sesión</Link>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Signup;
