export default function Faq() {
  return (
    <section className="section-size bg-black text-white">
      <div className="mt-4 px-4 mx-auto max-w-screen-xl">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-white">
          Preguntas frecuentes
        </h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2">
          <div>
            <Question
              title="¿Cómo funciona Grocerin?"
              answer="Grocerin es una plataforma que permite a productores locales poner en venta su producción agrícola, llevando a las casas productos frescos del campo sin intermediarios ni comisiones de por medio."
            />
            <Question
              title="¿Tengo que registrarme para usar Grocerin?"
              answer="No es necesario, puedes explorar la aplicación sin tener que registrarte. Sin embargo, si quieres comprar o vender productos y, en definitiva, disfrutar de la experiencia al completo, puedes registrarte en la plataforma."
            />
            <Question
              title="¿Cómo puedo convertirme en productor en la plataforma?"
              answer="El único requisito para poder empezar a vender en Grocerin es completar tu perfil, es decir, añadir tu número de teléfono y ubicación. Una vez hecho esto, podrás empezar a vender tu producción de inmediato."
            />
          </div>
          <div>
            <Question
              title="¿Grocerin ofrece envío a domicilio?"
              answer="Sí, Grocerin soporta la búsqueda de productores por ubicación y filtrada por envío a domicilio, por lo que podrás encontrar productores cerca de ti y contactar con ellos para concertar la dirección de entrega. Nosotros no intervenimos en la entrega."
            />
            <Question
              title="¿Qué métodos de pago acepta Grocerin?"
              answer="Grocerin no interviene en el proceso de pago, por lo que cada productor puede decidir de qué forma acepta los pagos por sus productos. Lo más común es que se acepte pago en efectivo, dado que las compras son en persona, aunque queda a libertad del vendedor."
            />
            <Question
              title="¿Qué ocurre si tengo un problema con mi pedido?"
              answer="Si has tenido algún problema con tu pedido, puedes reportarlo a la hora de valorar el mismo. Recibiremos tu problema y haremos lo posible por contactar al vendedor y solucionarlo cuanto antes."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const Question = ({ title, answer }) => {
  return (
    <div className="mb-10">
      <h3 className="flex items-center mb-4 text-lg font-medium text-white">
        <svg
          className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          ></path>
        </svg>
        {title}
      </h3>
      <p className="text-gray-400 text-justify">{answer}</p>
    </div>
  );
};
