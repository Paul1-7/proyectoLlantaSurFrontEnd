// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_MODULES = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, '/app'),
  clientes: {
    root: path(ROOTS_DASHBOARD, '/clientes'),
    nuevo: `${ROOTS_DASHBOARD}/clientes/nuevo`,
    modificar: `${ROOTS_DASHBOARD}/clientes/modificar`
  },
  empleados: {
    root: path(ROOTS_DASHBOARD, '/empleados'),
    nuevo: `${ROOTS_DASHBOARD}/empleados/nuevo`,
    modificar: `${ROOTS_DASHBOARD}/empleados/modificar`
  },
  productos: path(ROOTS_DASHBOARD, '/productos'),
  categorias: path(ROOTS_DASHBOARD, '/categorias'),
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
