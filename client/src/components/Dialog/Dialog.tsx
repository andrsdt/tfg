import { Dialog as UIDialog, Transition } from '@headlessui/react';
import * as React from 'react';
import 'intersection-observer';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocus?: React.MutableRefObject<null>;
};

export const DialogTitle = UIDialog.Title;

export const DialogDescription = UIDialog.Description;

export const Dialog = ({
  isOpen,
  onClose,
  children,
  initialFocus,
}: DialogProps) => {
  return (
    <>
      <Transition.Root show={isOpen} as={React.Fragment}>
        <UIDialog
          as="div"
          static
          className="absolute inset-0 z-50 m-auto max-h-[930px] max-w-[480px] overflow-hidden"
          open={isOpen}
          onClose={onClose}
          initialFocus={initialFocus}
        >
          <div className="flex h-full w-full items-end justify-center text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <UIDialog.Overlay className="absolute inset-0 top-0 mx-auto bg-gray bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {children}
            </Transition.Child>
          </div>
        </UIDialog>
      </Transition.Root>
    </>
  );
};
