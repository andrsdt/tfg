import { Id } from '@/types/ids';

const NEXT_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  UPLOAD: '/upload',
  CHATS: '/chats',
  FAVORITES: '/favorites',
  NOTIFICATIONS: '/notifications',
  MY_PROFILE: '/my-profile',
  EDIT_PROFILE: '/my-profile/edit',
  MY_LISTINGS: '/my-listings',
  MY_PURCHASES: '/my-purchases',
  MY_SALES: '/my-sales',
  BECOME_PRODUCER: '/become-producer',
  COMPLETE_ONBOARDING: '/complete-onboarding',
  SEARCH_LISTINGS: '/search',
  CHAT: (id: Id) => urlWithParams('/chats/[id]', { id }),
  PRODUCER_PROFILE: (id: Id) => urlWithParams('/producers/[id]', { id }),
  PRODUCER_REVIEWS: (id: Id) =>
    urlWithParams('/producers/[id]/reviews', { id }),
  DETAILS_LISTING: (id: Id) => urlWithParams('/listings/[id]', { id }),
  EDIT_LISTING: (id: Id) => urlWithParams('/listings/[id]/edit', { id }),
  REPORT_LISTING: (id: Id) => urlWithParams('/listings/[id]/report', { id }),
  MARK_SOLD_LISTING: (id: Id) => urlWithParams('/listings/[id]/sell', { id }),
  MARK_SOLD_LISTING_VIA_CONVERSATION: (id, conversationId) =>
    urlWithParams('/listings/[id]/sell/[conversationId]', {
      id,
      conversationId,
    }),
  RATE_ORDER: (id) => urlWithParams('/my-purchases/[id]/rate', { id }),
  REPORT_ORDER: (id) => urlWithParams('/my-purchases/[id]/report', { id }),
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
