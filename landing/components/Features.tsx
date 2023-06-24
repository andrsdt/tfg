import Image from 'next/image';

import chat from '/public/assets/mockups/chat.png';
import notifications from '/public/assets/mockups/notifications.png';
import product from '/public/assets/mockups/product.png';
import profile from '/public/assets/mockups/profile.png';
import review from '/public/assets/mockups/review.png';
import search from '/public/assets/mockups/search.png';
import { motion } from 'framer-motion';

export default function Features() {
  return (
    <section className="section-size bg-white xl:px-72 xl:py-20">
      <Feature
        title="Busca un producto"
        description="En Grocerin encontrarás todo lo que necesitas para preparar ese plato que tanto te gusta. Haz una búsqueda rápida y ponte en contacto con el vendedor, ¡Así de fácil!"
        images={[search, product]}
      />
      <Feature
        title="Contacta al productor"
        description="¿Has encontrado un producto que te gusta? ¡Perfecto! Contacta con el productor y acordad un sitio para hacer la venta. Nunca antes había sido tan sencillo comer sano."
        images={[profile, chat]}
        imagesFirst
      />
      <Feature
        title="Valora tu compra"
        description="Una vez hayas recibido el producto, valora tu experiencia con el productor desde la aplicación. De esta forma ayudarás a otros usuarios de la comunidad a encontrar los mejores productos."
        images={[notifications, review]}
      />
    </section>
  );
}

const Feature = ({ title, description, images, imagesFirst = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      }}
      viewport={{ once: true }}
      className={`grid ${
        imagesFirst ? 'flex-col-reverse' : undefined
      } grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-32 gap-x-10 md:gap-x-24 items-center mb-14`}
    >
      <div className={imagesFirst ? 'order-none md:order-2' : undefined}>
        <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-center text-black md:leading-tight sm:text-left md:text-5xl">
          {title}
        </h2>
        <p className="mb-5 text-base text-center text-gray-600 sm:text-left md:text-xl">
          {description}
        </p>
      </div>
      <div className="flex -space-x-20 w-full h-full justify-center">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image}
            alt={Object.keys({ image }).pop()}
            height={500}
            sizes="(max-width: 768px) 50vw, 100vw"
          />
        ))}
      </div>
    </motion.div>
  );
};
