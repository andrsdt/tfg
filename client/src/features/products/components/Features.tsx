import { MapPinIcon, TruckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Feature } from '../types/features';

const featureIcons = {
  allows_pickup: {
    text: (
      <p>
        Puedes <wbr />
        recogerlo
      </p>
    ),
    icon: <MapPinIcon className="w-12" />,
  },
  allows_delivery: {
    text: (
      <p>
        Entrego a <wbr />
        domicilio
      </p>
    ),
    icon: <TruckIcon className="w-12" />,
  },
};

type ProductFeaturesProps = {
  features: Feature[];
  className?: string;
};

export const ProductFeatures = ({
  features,
  className = '',
}: ProductFeaturesProps) => (
  <div className={clsx('flex items-center space-x-6', className)}>
    {features.map((feature) => (
      <FeatureItem key={feature} feature={feature} />
    ))}
  </div>
);

const FeatureItem = ({ feature }: { feature: Feature }) => (
  <div className="flex w-min flex-col items-center justify-center space-y-2 whitespace-nowrap text-center text-black">
    {featureIcons[feature].icon}
    {featureIcons[feature].text}
  </div>
);
