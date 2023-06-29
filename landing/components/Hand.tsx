import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const handEnterAnimation: Variants = {
  initial: {
    opacity: 0.5,
    rotate: 90,
    y: 100,
    originY: 1, // pivot from the bottom
  },

  animate: {
    opacity: 1,
    y: 5, // move the down a bit so it doesn't look like it's floating
    rotate: 0,
    transition: {
      duration: 3,
      type: 'spring',
      bounce: 0.2,
    },
  },
};

const handWobbleAnimation: Variants = {
  animate: {
    x: [0, 5],
    y: [5, 10],
    rotate: [0, 4],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: 'mirror',
    },
  },
};

export default function Hand() {
  const [currentAnimation, setCurrentAnimation] = useState(handEnterAnimation);

  return (
    <motion.div
      className="z-0 place-self-end md:block mt-8 md:mt-0 w-full md:w-1/2"
      variants={currentAnimation}
      initial="initial"
      animate="animate"
      onAnimationComplete={() => setCurrentAnimation(handWobbleAnimation)}
    >
      <Image
        className="w-full"
        src="/assets/hand-map.png"
        alt="Hand waving holding a phone with the Grocerin app open"
        width={1000}
        height={1000}
      />
    </motion.div>
  );
}
