import { Coordinates } from '@/types/coordinates';
import { Point } from 'geojson';

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatMoney = (amount: number) => {
  return amount.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// 34666123456 => +34 666 123 456
export const formatPhoneNumber = (phone: string | number) => {
  return phone
    .toString()
    .replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
};

// WKT is the Well-Known Text format for representing vector geometry objects
// it's the one used by PostGIS so we have to send it in this format
export const formatCoordinatesAsWKT = (coordinates: Coordinates) => {
  return `POINT (${coordinates.lng} ${coordinates.lat})`;
};

// POINT (lng lat) => { lat, lng }
export const formatWKTAsCoordinates = (
  wkt: string | undefined
): Coordinates | undefined => {
  const coordinatesStr = wkt?.match(/POINT \((.*) (.*)\)/);
  if (!coordinatesStr) return undefined;

  const [lat, lng] = coordinatesStr.slice(1).reverse();
  return { lat: Number.parseFloat(lat), lng: Number.parseFloat(lng) };
};

// Given a a location from the API, transform the location to {lat, lng}
export const transformLocationToCoordinates = (
  location: Point | undefined
): Coordinates | undefined => {
  if (!location?.coordinates) return undefined;
  // Coords are stored as [lng, lat] in the DB because of the WKT standard. We flip them here again
  const [lng, lat] = location.coordinates;
  return { lat, lng };
};

export const transformCoordsPairToCoordinates = (
  coords: string
): Coordinates | undefined => {
  const [lng, lat] = coords.split(',').map((coord) => Number.parseFloat(coord));
  if (!lng || !lat) return undefined;
  return { lat, lng };
};
