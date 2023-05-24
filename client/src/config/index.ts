export const API_URL = process.env.NEXT_PUBLIC_URL as string;

// Code below will also replace https with wss on secure contexts
export const WS_URL = API_URL.replace(/^http/, 'ws');

export const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
