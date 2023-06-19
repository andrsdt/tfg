import Link from 'next/link';
import Logo from '/public/assets/Logo.svg';

export default function Footer() {
  return (
    <section className="flex flex-col section-size -mt-16 xl:-mt-0 bg-black text-white text-sm text-center font-montserrat">
      <div className="mb-2">
        <Logo className="w-28" alt="Logo" />
      </div>
      <div className="mt-2">
        Consulta los
        <span className="font-bold">
          <Link href="/terms"> Términos y condiciones</Link>
        </span>
      </div>
      <p>
        ¿Tienes dudas? Contáctanos en{' '}
        <a
          className="font-medium underline"
          href="mailto:
					app.grocerin@gmail.com"
        >
          app.grocerin@gmail.com
        </a>
      </p>
      <div>© 2023 Grocerin. Todos los derechos reservados</div>
    </section>
  );
}
