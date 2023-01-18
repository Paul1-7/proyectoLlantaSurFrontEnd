// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_MODULES = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, '/app'),
  customers: {
    root: path(ROOTS_DASHBOARD, '/clientes'),
    new: `${ROOTS_DASHBOARD}/clientes/nuevo`,
    modify: `${ROOTS_DASHBOARD}/clientes/modificar`
  },
  employees: {
    root: path(ROOTS_DASHBOARD, '/empleados'),
    new: `${ROOTS_DASHBOARD}/empleados/nuevo`,
    modify: `${ROOTS_DASHBOARD}/empleados/modificar`
  },
  categories: {
    root: path(ROOTS_DASHBOARD, '/categorias'),
    new: `${ROOTS_DASHBOARD}/categorias/nuevo`,
    modify: `${ROOTS_DASHBOARD}/categorias/modificar`
  },
  brands: {
    root: path(ROOTS_DASHBOARD, '/marcas'),
    new: `${ROOTS_DASHBOARD}/marcas/nuevo`,
    modify: `${ROOTS_DASHBOARD}/marcas/modificar`
  },
  products: {
    root: path(ROOTS_DASHBOARD, '/productos'),
    new: `${ROOTS_DASHBOARD}/productos/nuevo`,
    modify: `${ROOTS_DASHBOARD}/productos/modificar`
  },
  providers: {
    root: path(ROOTS_DASHBOARD, '/proveedores'),
    new: `${ROOTS_DASHBOARD}/proveedores/nuevo`,
    modify: `${ROOTS_DASHBOARD}/proveedores/modificar`
  },
  subsidiaries: {
    root: path(ROOTS_DASHBOARD, '/sucursales'),
    new: `${ROOTS_DASHBOARD}/sucursales/nuevo`,
    modify: `${ROOTS_DASHBOARD}/sucursales/modificar`
  },
  sells: {
    root: path(ROOTS_DASHBOARD, '/ventas'),
    new: `${ROOTS_DASHBOARD}/ventas/nuevo`,
    modify: `${ROOTS_DASHBOARD}/ventas/modificar`
  },
  reports: {
    root: path(ROOTS_DASHBOARD, '/reportes'),
    sales: path(ROOTS_DASHBOARD, '/reportes/ventas'),
    purchases: path(ROOTS_DASHBOARD, '/reportes/compras'),
    products: path(ROOTS_DASHBOARD, '/reportes/inventario')
  },
  generalManagement: {
    root: path(ROOTS_DASHBOARD, '/administracion'),
    businessData: `${ROOTS_DASHBOARD}/administracion/datos-negocio`,
    invoiceBatching: `${ROOTS_DASHBOARD}/administracion/dosificacion-facturas`
  },
  shop: {
    root: path('/administracion'),
    products: `${ROOTS_DASHBOARD}/productos`
  },
  compras: path(ROOTS_DASHBOARD, '/compras'),
  pedidos: path(ROOTS_DASHBOARD, '/pedidos'),
  reseñas: path(ROOTS_DASHBOARD, '/reseñas'),
  descuentos: path(ROOTS_DASHBOARD, '/descuentos'),
  favoritos: path(ROOTS_DASHBOARD, '/favoritos')
};
