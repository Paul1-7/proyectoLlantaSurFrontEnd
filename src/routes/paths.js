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
  productos: path(ROOTS_DASHBOARD, '/productos'),
  compras: path(ROOTS_DASHBOARD, '/compras'),
  proveedores: path(ROOTS_DASHBOARD, '/proveedores'),
  marcas: path(ROOTS_DASHBOARD, '/marcas'),
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
