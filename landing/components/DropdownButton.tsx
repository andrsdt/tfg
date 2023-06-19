import Link from 'next/link';
import { useState } from 'react';
import Triangle from '/public/assets/logos/Triangle.svg';

export default function DropdownButton({ navbarBgColor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`relative py-2 px-4 rounded-3xl ${
          navbarBgColor === 'black'
            ? 'bg-white text-black '
            : 'bg-black text-white '
        }
            `}
        onClick={() => setIsOpen(!isOpen)}
      >
        Ir a la app
        <Triangle className="w-3 h-3 ml-2 place-self-center inline fill-white" />
        <div
          className={`-z-10 transition-all duration-300 absolute flex flex-col w-full left-0 top-0 bg-black rounded-b-3xl origin-top translate-y-5 pt-5 pb-1 ${
            isOpen ? 'scale-y-100' : 'scale-y-0'
          }`}
        >
          <Link
            className="py-2"
            href="https://20230311t201903-dot-bugalink-379817.ew.r.appspot.com/"
          >
            Sprint 1
          </Link>
          <Link
            className="py-2"
            href="https://20230329t004804-dot-bugalink-379817.ew.r.appspot.com/"
          >
            Sprint 2
          </Link>
          <Link
            className="py-2"
            href="https://20230415t194135-dot-bugalink-379817.ew.r.appspot.com"
          >
            Sprint 3
          </Link>
          <Link
            className="py-2"
            href="https://20230415t194135-dot-bugalink-379817.ew.r.appspot.com/"
          >
            PPL
          </Link>
          <Link
            className="py-2"
            href="https://bugalink-379817.ew.r.appspot.com/"
          >
            WPL
          </Link>
          <Link className="py-2" href="https://app.bugalink.es/">
            Actual
          </Link>
        </div>
      </button>
    </>
  );
}
