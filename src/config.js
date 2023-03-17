const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
const API_URL_DEV = import.meta.env.VITE_API_URL_DEV;
const isProd = process.env.NODE_ENV === 'production';

const config = {
  BASE_URL: isProd ? API_URL_BASE : API_URL_DEV,
};

export const ROLES = {
  ADMINISTRADOR: {
    name: 'Administrador',
    id: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
  },
  EMPLEADO_VENTAS: {
    name: 'Empleado de Ventas',
    id: '678197a0-69a8-4c24-89a5-bf13873cc08b',
  },
  CLIENTE: {
    name: 'Cliente',
    id: '95acac1e-28be-4ef4-9978-3979277d511b',
  },
};

export default config;
