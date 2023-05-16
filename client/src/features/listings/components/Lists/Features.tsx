import clsx from 'clsx';
import Image from 'next/image';
import { FEATURES, Feature } from '../../types/features';
import { FunctionComponent, SVGAttributes } from 'react';
import { MinusCircleIcon } from '@heroicons/react/24/outline';

type FeatureListProps = {
  features: Feature[];
  className?: string;
  itemClassName?: string;
  handleDelete?: (any) => void;
};

export const FeatureList = ({
  features,
  className = '',
  itemClassName = '',
  handleDelete,
}: FeatureListProps) => (
  <div className={clsx('flex', className)}>
    {features.map((feature) => {
      const key = Object.keys(FEATURES).find(
        (k) => k === feature.toUpperCase()
      );

      if (!key) return <></>;

      return (
        <div key={feature} className="relative">
          {handleDelete && (
            <MinusCircleIcon
              className="absolute -right-3 -top-2 z-10 h-10 w-10 cursor-pointer overflow-visible fill-light-red text-white"
              onClick={() => handleDelete(FEATURES[key].name)}
            />
          )}
          <FeatureItem feature={FEATURES[key]} className={itemClassName} />
        </div>
      );
    })}
  </div>
);

type FeatureItemProps = {
  feature: {
    name: Feature;
    translation: 'Delivery';
    icon: FunctionComponent<SVGAttributes<SVGElement>>;
  };
  className?: string;
};

const FeatureItem = ({ feature, className }: FeatureItemProps) => (
  <div
    className={clsx(
      'grid w-20 min-w-[6rem] grid-rows-2 place-items-center text-center text-black',
      className
    )}
  >
    <Image
      key={feature.name}
      src={feature.icon as any}
      width={50}
      height={50}
      alt={feature.name}
    />
    <p>{feature.translation}</p>
  </div>
);
