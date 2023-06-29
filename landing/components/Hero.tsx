import { motion } from 'framer-motion';
import Hand from './Hand';

export default function Hero() {
  return (
    <section
      id="/"
      className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:pl-48 lg:pr-24 md:px-12 px-4 bg-secondary overflow-clip"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 1, ease: 'easeInOut' }}
        className="text-left flex-1 md:flex-1 md:mr-10"
      >
        <div className="flex flex-col text-6xl xl:text-7xl font-caveat font-bold mb-2">
          <p>Del campo</p>
          <p>a tu casa</p>
        </div>
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
