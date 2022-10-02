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
  compras: path(ROOTS_DASHBOARD, '/compras'),
  pedidos: path(ROOTS_DASHBOARD, '/pedidos'),
  ventas: path(ROOTS_DASHBOARD, '/ventas'),
  reseñas: path(ROOTS_DASHBOARD, '/reseñas'),
  descuentos: path(ROOTS_DASHBOARD, '/descuentos'),
  favoritos: path(ROOTS_DASHBOARD, '/favoritos'),
  administracionGeneral: path(ROOTS_DASHBOARD, '/administracion-general'),
  reportes: {
    root: path(ROOTS_DASHBOARD, '/reportes'),
    pageFour: path(ROOTS_DASHBOARD, '/reportes/ventas'),
    pageFive: path(ROOTS_DASHBOARD, '/reportes/compras'),
    pageSix: path(ROOTS_DASHBOARD, '/reportes/productos')
  }
};
