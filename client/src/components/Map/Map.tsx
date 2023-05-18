import { COLORS } from '@/constants';
import { Coordinates } from '@/types/coordinates';
import { Circle, GoogleMap } from '@react-google-maps/api';
import clsx from 'clsx';
import React, { useCallback } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

type MapProps = {
  center: Coordinates;
  hasCircleArea?: boolean;
  radiusInMeters?: number;
  className?: string;
};

// const SPAIN_COORDINATE_BOUNDS = {
//   northeast: { lat: 43.350811, lng: 5.023299 },
//   southwest: { lat: 35.416876, lng: -11.138495 },
// };

const SPAIN_CENTER_COORDINATES = { lat: 40.463667, lng: -3.74922 };
const SPAIN_CENTER_ZOOM = 4;

const Map = ({
  center,
  hasCircleArea = true,
  radiusInMeters = 1000,
  className,
}: MapProps) => {
  const currentCenter = center ?? SPAIN_CENTER_COORDINATES;
  const currentZoom = center ? 14 : SPAIN_CENTER_ZOOM;

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(
    //   SPAIN_COORDINATE_BOUNDS.southwest,
    //   SPAIN_COORDINATE_BOUNDS.northeast
    // );
    // map.fitBounds(bounds);
  }, []);

  return (
    <div className={clsx(className)}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={currentZoom}
        onLoad={onLoad}
      >
        {hasCircleArea && currentCenter !== SPAIN_CENTER_COORDINATES && (
          <Circle
            center={currentCenter}
            radius={radiusInMeters}
            options={{
              fillColor: COLORS['light-green'],
              fillOpacity: 0.2,
              strokeColor: COLORS.green,
              strokeOpacity: 0.4,
              strokeWeight: 1,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default React.memo(Map);
