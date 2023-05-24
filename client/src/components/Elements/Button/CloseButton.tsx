import { XMarkIcon } from '@heroicons/react/24/solid';
import router from 'next/router';

export const CloseButton = () => {
  return (
    <button onClick={() => router.back()}>
      <XMarkIcon className="w-9" />
    </button>
  );
};
