const NEXT_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  UPLOAD: '/upload',
  CHATS: '/chats',
  FAVORITES: '/favorites',
  NOTIFICATIONS: '/notifications',
  MY_PROFILE: '/my-profile',
  BECOME_PRODUCER: '/become-producer',
  COMPLETE_ONBOARDING: '/complete-onboarding',
  PRODUCER_PROFILE: (id) => urlWithParams('/producers/[id]', { id }),
  DETAILS_LISTING: (id) => urlWithParams('/listings/[id]', { id }),
  EDIT_LISTING: (id) => urlWithParams('/listings/[id]/edit', { id }),
  REPORT_LISTING: (id) => urlWithParams('/listings/[id]/report', { id }),
  SEARCH_LISTINGS: '/search',
};

const urlWithParams = (route, params) => {
  let path = route;
  let hasUndefParams = false;

  Object.keys(params).forEach((key) => {
    const value = params[key];
    // If the value is null or undefined we simply don't redirect
    if (value === null || value === undefined) hasUndefParams = true;
    path = path.replace(`[${key}]`, encodeURIComponent(value));
  });

  if (hasUndefParams || path.match(/.*\[[\w]+\].*/)) {
    return '';
  }
  return path;
};

export default NEXT_ROUTES;
