import {
  ChatBubbleOvalLeftEllipsisIcon as ChatIconSolid,
  HeartIcon as HeartIconSolid,
  HomeIcon as HomeIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BaseLayout } from './Base';

import {
  ChatBubbleOvalLeftEllipsisIcon as ChatIconOutline,
  HeartIcon as HeartIconOutline,
  HomeIcon as HomeIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
  UserIcon as UserIconOutline,
} from '@heroicons/react/24/outline';

import NEXT_ROUTES from '@/constants/routes';

type LayoutWithNavbarProps = {
  children: React.ReactNode;
  className?: string;
};

export const LayoutWithNavbar = ({
  children,
  className = '',
}: LayoutWithNavbarProps) => {
  return (
    <>
      <BaseLayout className={'overflow-auto pb-20'}>
        <div className={clsx('h-full overflow-y-scroll', className)}>
          {children}
        </div>
        <BottomNavbar />
      </BaseLayout>
    </>
  );
};

const BottomNavbar = () => (
  <div className="absolute bottom-0 left-0 h-20 w-full bg-white shadow-t-md">
    <div className="container mx-auto flex h-full items-center justify-around">
      <NavbarItem
        icons={{
          solid: <HomeIconSolid />,
          outline: <HomeIconOutline />,
        }}
        text="Inicio"
        href={NEXT_ROUTES.HOME}
      />
      <NavbarItem
        icons={{
          solid: <ChatIconSolid />,
          outline: <ChatIconOutline />,
        }}
        text="Chats"
        href={NEXT_ROUTES.CHATS}
      />
      <NavbarItem
        icons={{
          solid: <PlusCircleIconSolid />,
          outline: <PlusCircleIconOutline />,
        }}
        text="Subir"
        href={NEXT_ROUTES.UPLOAD}
      />
      <NavbarItem
        icons={{
          solid: <HeartIconSolid />,
          outline: <HeartIconOutline />,
        }}
        text="Favoritos"
        href={NEXT_ROUTES.FAVORITES}
      />
      <NavbarItem
        icons={{
          solid: <UserIconSolid />,
          outline: <UserIconOutline />,
        }}
        text="Tú"
        href={NEXT_ROUTES.MY_PROFILE}
      />
    </div>
  </div>
);

type NavbarItemProps = {
  icons: {
    solid: React.ReactNode;
    outline: React.ReactNode;
  };
  text: string;
  href: string;
};

const NavbarItem = ({ icons, text, href }: NavbarItemProps) => {
  const router = useRouter();
  const isSelected = router.asPath === href;

  return (
    <Link href={href} replace={isSelected}>
      <div
        className={clsx('flex h-full w-8 flex-col items-center', {
          'text-green': isSelected,
        })}
      >
        {isSelected ? icons.solid : icons.outline}
        <p className="text-lg">{text}</p>
      </div>
    </Link>
  );
};
