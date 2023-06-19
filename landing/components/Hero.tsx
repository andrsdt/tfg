import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import Hand from './Hand';

const TYPEWRITER_WORDS = ['gastos', 'problemas', 'estrés', 'polución'];

export default function Hero() {
  return (
    <section
      id="/"
      className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary font-montserrat overflow-clip"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 1, ease: 'easeInOut' }}
        className="text-left md:flex-1 md:mr-10"
      >
        <h1 className="md:w-80 flex flex-col md:flex-row text-6xl xl:text-7xl font-caveat font-bold mb-2 whitespace-nowrap">
          Del campo a casa
        </h1>
        <p className="xl:text-2xl xl:w-4/5 mb-10 font-pt-serif">
          Con Grocerin puedes comprar y vender productos frescos del campo sin
          intermediarios ni comisiones. Regístrate y empieza a disfrutar de una
          comida más sana y sostenible 🌱
        </p>
      </motion.div>
      <Hand />
    </section>
  );
}
