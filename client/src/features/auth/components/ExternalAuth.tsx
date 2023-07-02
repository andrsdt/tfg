import NEXT_ROUTES from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import googleUrl from '/public/logos/google.svg?url';

export const ExternalAuth = () => (
  <>
    <div className="flex flex-row items-center justify-center space-x-4">
      <Link
        href={NEXT_ROUTES.GOOGLE_LOGIN}
        className="flex items-center justify-center"
      >
        <Image
          src={googleUrl as any}
          alt="Google"
          className="h-10 w-10 rounded-full bg-white p-2 outline outline-1 outline-light-gray"
        />
      </Link>
    </div>
    <p className="font-light text-gray">o usa tu cuenta de correo</p>
  </>
);
