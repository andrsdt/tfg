import NEXT_ROUTES from '@/constants/routes';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

type ProductOptionsDropdownProps = {
  // TODO: Add product type when it's defined
  product: any;
};

export const ProductOptionsDropdown = ({
  product,
}: ProductOptionsDropdownProps) => {
  const [pageURL, setPageURL] = useState('');
  const [isNativeShare, setNativeShare] = useState(false);

  useEffect(() => {
    setPageURL(window.location.href);
    if (navigator?.share && navigator?.canShare({})) {
      setNativeShare(true);
    }
  }, []);

  const shareData = {
    title: 'Compartir',
    text: 'Mira este producto en la plataforma de la Red de Huertas',
    url: pageURL,
  };

  return (
    <Menu as="div" className="absolute right-4 top-4 z-10">
      <div>
        <Menu.Button className="h-12 w-12 rounded-full bg-white p-2 shadow-lg">
          <EllipsisVerticalIcon />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right whitespace-nowrap rounded-md bg-white text-end text-lg shadow-lg focus:outline-none">
          <div className="justify-between p-4">
            <Menu.Item>
              <Link href={NEXT_ROUTES.PROFILE(product?.producer?.id)}>
                Ver perfil
              </Link>
            </Menu.Item>
            <hr className="my-2 text-light-gray" />
            <Menu.Item>
              <Link href={NEXT_ROUTES.REPORT_LISTING(product?.id)}>
                Reportar artículo
              </Link>
            </Menu.Item>
            {isNativeShare && (
              <>
                <hr className="my-2 text-light-gray" />
                <Menu.Item>
                  <button onClick={() => navigator?.share(shareData)}>
                    Compartir
                  </button>
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
