const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
const API_URL_DEV = import.meta.env.VITE_API_URL_DEV;
const isProd = process.env.NODE_ENV === 'production';

const config = {
  BASE_URL: isProd ? API_URL_BASE : API_URL_DEV,
};

export default config;
