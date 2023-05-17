import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

// configure Day.js to use the UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);
// allow "X minutes ago" and similar formats
dayjs.extend(relativeTime);

// set the default locale to spanish (allows "hace ... minutos" and similar formats)
dayjs.locale('es');

// set the default timezone to the spanish one, where the app is based
dayjs.tz.setDefault(
  Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Madrid'
);
export default dayjs;
