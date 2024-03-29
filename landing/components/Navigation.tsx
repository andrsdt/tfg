import { AnimatePresence, motion, useScroll, Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '/public/assets/Logo.svg';
import Cross from '/public/assets/logos/Cross.svg';

const menuVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  open: { opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
};

const bgColors = {
  faq: 'black',
  features: 'white',
  '/': 'rgb(255, 247, 227)', // Light brown
};

const SECTION_OFFSET = 50;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [navbarBgColor, setNavbarBgColor] = useState(bgColors['/']);

  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.on('change', (latest) => {
      // Get the current section based on the scroll position:
      const currentSection = Object.keys(bgColors).find(
        (section) =>
          latest >= document.getElementById(section)?.offsetTop - SECTION_OFFSET
      );

      // Update the background color based on the current section:
      if (currentSection) setNavbarBgColor(bgColors[currentSection]);
    });

    // Cleanup function
    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY]);

  return (
    <nav
      className="fixed flex justify-between py-4 w-full lg:px-48 md:px-12 px-4 content-center z-10 transition-colors duration-200"
      style={{
        backgroundColor: navbarBgColor,
        color: navbarBgColor === 'black' ? 'white' : 'black',
      }}
    >
      <div className="flex items-center">
        <Link href="/#/" scroll={false}>
          <Logo alt="Logo" className="h-10 cursor-pointer translate-y-1" />
        </Link>
      </div>
      <ul className="font-montserrat items-center hidden md:flex">
        <li className="growing-underline mx-3">
          <Link href="/#features" scroll={false}>
            Funcionalidades
          </Link>
        </li>
        <li className="growing-underline mx-3">
          <Link href="/#faq" scroll={false}>
            Preguntas frecuentes
          </Link>
        </li>
        <li className="growing-underline mx-3">
          <Link href="/terms" scroll={false}>
            Términos y condiciones
          </Link>
        </li>
      </ul>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobileNav"
            className="md:hidden px-2 py-4 fixed top-0 left-0 w-full h-full z-20"
            style={{
              backgroundColor: navbarBgColor,
              color: navbarBgColor === 'black' ? 'white' : 'black',
            }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div id="hideMenu" className="flex justify-end">
              <button>
                <Cross
                  className="w-10 h-10"
                  fill={navbarBgColor === 'black' ? 'white' : 'black'}
                  onClick={() => setOpen(false)}
                />
              </button>
            </div>
            <ul className="font-montserrat flex flex-col mx-8 text-center items-center text-3xl">
              <li className="py-6">
                <Link href="/#features" onClick={() => setOpen(false)}>
                  Funcionalidades
                </Link>
              </li>
              <li className="py-6">
                <Link href="/#faq" onClick={() => setOpen(false)}>
                  Preguntas frecuentes
                </Link>
              </li>
              <li className="py-6">
                <Link href="/terms" onClick={() => setOpen(false)}>
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
