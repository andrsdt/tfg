const NEXT_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  CHATS: '/chats',
  UPLOAD: '/upload',
  FAVORITES: '/favorites',
  PROFILE: (id) => urlWithParams('/users/[id]', { id }),
  PRODUCT_DETAILS: (id) => urlWithParams('/products/[id]', { id }),
  REPORT_LISTING: (id) => urlWithParams('/products/[id]/report', { id }),
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
