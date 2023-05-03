import Link from 'next/link';
// import UilFacebookF from '@iconscout/react-unicons/icons/uil-facebook-f';
// import UilTwitter from '@iconscout/react-unicons/icons/uil-twitter';
// import UilGoogle from '@iconscout/react-unicons/icons/uil-google';

export const ExternalAuth = () => (
  <>
    <div className="flex flex-row items-center justify-center space-x-4">
      <Link href="" className="flex items-center justify-center">
        {/* <UilFacebookF className="h-10 w-10 rounded-full bg-[#4267B2] p-2 text-white" /> */}
      </Link>
      <Link href="" className="flex items-center justify-center">
        {/* <UilTwitter className="h-10 w-10 rounded-full bg-[#1DA1F2] p-2 text-white" /> */}
      </Link>
      <Link href="" className="flex items-center justify-center">
        {/* <UilGoogle className="h-10 w-10 rounded-full bg-[#DB4437] p-2 text-white" /> */}
      </Link>
    </div>
    <p className="font-light text-gray">o usa tu cuenta de correo</p>
  </>
);
