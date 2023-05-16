import { Separator } from '@/components/Elements';
import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/notifications';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { deleteListing } from '../../api/delete';
import { Listing } from '../../types/listings';

const redirectAndNotify = async () => {
  await router.push(NEXT_ROUTES.HOME);
  emitSuccess({
    title: 'Producto eliminado',
    message: 'El producto se ha eliminado correctamente',
  });
};

type ListingOptionsDropdownProps = {
  listing: Listing;
};

export const ListingOptionsDropdown = ({
  listing,
}: ListingOptionsDropdownProps) => {
  const [pageURL, setPageURL] = useState('');
  const [isNativeShare, setNativeShare] = useState(false);
  const [handleDeleteListing] = useSubmissionHandler(deleteListing, {
    onSuccess: redirectAndNotify,
  });
  const { user } = useAuth();

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

  if (!listing) return <></>;
  const isListingOwner = user?.pk === listing.producer.user.id;

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
              <Link href={NEXT_ROUTES.PRODUCER_PROFILE(listing.producer)}>
                Ver perfil
              </Link>
            </Menu.Item>
            {isListingOwner && (
              <>
                <Separator />
                <Menu.Item>
                  <Link href={NEXT_ROUTES.EDIT_LISTING(listing.id)}>
                    Editar
                  </Link>
                </Menu.Item>
                <Separator />
                <Menu.Item>
                  <button
                    onClick={() => handleDeleteListing({ id: listing.id })}
                  >
                    Eliminar
                  </button>
                </Menu.Item>
              </>
            )}
            {!isListingOwner && (
              <>
                <Separator />
                <Menu.Item>
                  <Link href={NEXT_ROUTES.REPORT_LISTING(listing.id)}>
                    Reportar artículo
                  </Link>
                </Menu.Item>
              </>
            )}
            {isNativeShare && (
              <>
                <Separator />
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
