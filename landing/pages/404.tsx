import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function FourOhFour() {
  return (
    <>
      <Navigation />
      <div className="w-full h-screen grid grid-rows-2 md:grid-rows-none md:grid-cols-2 place-items-center overflow-y-scroll p-4 px-16 xl:px-32 bg-secondary gap-16">
        <span>
          <h1 className="text-8xl font-bold md:text-9xl">404</h1>
          <p className="font-pt-serif text-2xl">
            No sabemos cómo has acabado aquí.{' '}
            <Link className="font-semibold" href="/">
              Vuelve a la página principal
            </Link>
          </p>
        </span>
      </div>
    </>
  );
}
