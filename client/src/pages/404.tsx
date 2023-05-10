import { BaseLayout } from '@/components/Layouts';
import Link from 'next/link';

const FourOhFour = () => (
  <BaseLayout className="grid h-full grid-rows-2 place-items-center p-4 px-8">
    <span>
      <h1 className="text-8xl font-bold md:text-9xl">404</h1>
      <p className="font-pt-serif text-2xl">
        No sabemos cómo has acabado aquí.{' '}
        <Link className="font-semibold" href="/">
          Vuelve a la página principal
        </Link>
      </p>
    </span>
    {/* <Image src={''} alt="404" width={1024} height={792} /> */}
  </BaseLayout>
);

export default FourOhFour;
