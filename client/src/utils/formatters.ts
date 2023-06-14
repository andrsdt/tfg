import { UNITS } from '@/features/listings/types/units';
import dayjs from '@/lib/dayjs';
import { Coordinates } from '@/types/coordinates';
import { Point } from 'geojson';

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatMoney = (amountInCents: number) => {
  return (amountInCents / 100).toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });
};

// 20 de Mayo de 2023
export const formatDate = (date: string, withYear = false) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: withYear ? 'numeric' : undefined,
    month: 'long',
    day: 'numeric',
  });
};

// Date to "8 feb"
export const formatShortDate = (date: string) => dayjs(date).format('D MMM');

export const formatPricePerUnit = (price: number, unit: keyof typeof UNITS) =>
  `${formatMoney(price)}/${UNITS[unit].translationShort}`;

// (5, "UNIT") => 5 uds
export const formatQuantityWithUnit = (
  quantity: number,
  unit: keyof typeof UNITS
) => {
  const isOneUnit = quantity === 1;
  const selectedUnit = isOneUnit
    ? UNITS[unit].translationShort
    : UNITS[unit].translationShortPlural;
  return `${quantity} ${selectedUnit}`;
};

// 34666123456 => +34 666 123 456
export const formatSpanishPhoneNumber = (phone: string | number) => {
  return phone
    .toString()
    .replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
};

// WKT is the Well-Known Text format for representing vector geometry objects
// it's the one used by PostGIS so we have to send it in this format
export const formatCoordinatesAsWKT = (coordinates: Coordinates) => {
  if (!coordinates) return undefined;
  return `POINT (${coordinates.lng} ${coordinates.lat})`;
};

// POINT (lng lat) => { lat, lng }
export const formatWKTAsCoordinates = (
  wkt: string | undefined
): Coordinates | undefined => {
  const coordinatesStr = RegExp(/POINT \((.*) (.*)\)/).exec(wkt);
  if (!coordinatesStr) return undefined;

  const [lat, lng] = coordinatesStr.slice(1).reverse();
  return { lat: Number.parseFloat(lat), lng: Number.parseFloat(lng) };
};

// Given a a location from the API, transform the location to {lat, lng}
export const transformLocationToCoordinates = (
  location: Partial<Point> | undefined
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

// Used in zod schemas to parse money from CurrencyInput to cents
export const parseMoneyString = (moneyString: string) => {
  if (!moneyString) return null;
  return (
    Number.parseFloat(moneyString.replace(/[^0-9.,]/g, '').replace(',', '.')) *
    100
  );
};

// TODO: test with names with more than 2 words or propositions. There is plenty of room for improvement here
export const shortenName = (firstName: string, lastName: string) => {
  if (!firstName || !lastName) return '';
  // Pablo López Benítez' -> 'Pablo López'
  // Pablo Delfín López Benítez' -> 'Pablo D. López'
  // If the first name has two words, the second word is replaced by the first letter of the last name
  const prepositions = ['de', 'del', 'la', 'las', 'los'];
  const [firstLastNameWord, ...restLastNameWords] = lastName.split(' ');
  const shortenedLastName = prepositions.includes(
    firstLastNameWord.toLowerCase()
  )
    ? [firstLastNameWord, ...restLastNameWords].join(' ')
    : firstLastNameWord;

  const shortenedFirstName =
    firstName.split(' ').length > 1
      ? `${firstName.split(' ')[0]} ${firstName.split(' ')[1].charAt(0)}.`
      : firstName;

  return `${shortenedFirstName} ${shortenedLastName}`;
};
