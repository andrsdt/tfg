import NEXT_ROUTES from '@/constants/routes';
import { ExternalAuth } from '@/features/auth/components/ExternalAuth';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import twoFarmers from '/public/illustrations/two-farmers.png';
import { BaseLayout } from '@/components/Layouts';

const Login = () => {
  useAuth({ middleware: ['guest'] });

  return (
    <BaseLayout className="flex h-full flex-col justify-end overflow-y-hidden">
      <span className="flex w-full justify-center overflow-x-clip">
        <Image
          src={twoFarmers}
          alt="Illustration of two farmers"
          className="origin-top scale-150"
        />
      </span>
      <div className="z-10 -mt-4 rounded-t-3xl bg-light-gray text-center">
        <p className="pb-8 pt-4 text-3xl text-gray">Iniciar sesión</p>
        <div className="-mt-4 rounded-t-3xl bg-white p-5">
          <ExternalAuth />
          <LoginForm className="py-4" />
          <p className="inline-block font-light text-gray">
            ¿No tienes una cuenta?
          </p>
          <Link href={NEXT_ROUTES.SIGN_UP}>&nbsp;Regístrate </Link>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Login;
