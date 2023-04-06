// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/administracion';
const ROOTS_SHOP = '/';

// ----------------------------------------------------------------------

export const PATH_MODULES = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, '/panel-control'),
  customers: {
    root: path(ROOTS_DASHBOARD, '/clientes'),
    new: `${ROOTS_DASHBOARD}/clientes/nuevo`,
    modify: `${ROOTS_DASHBOARD}/clientes/modificar`,
  },
  employees: {
    root: path(ROOTS_DASHBOARD, '/empleados'),
    new: `${ROOTS_DASHBOARD}/empleados/nuevo`,
    modify: `${ROOTS_DASHBOARD}/empleados/modificar`,
  },
  categories: {
    root: path(ROOTS_DASHBOARD, '/categorias'),
    new: `${ROOTS_DASHBOARD}/categorias/nuevo`,
    modify: `${ROOTS_DASHBOARD}/categorias/modificar`,
  },
  brands: {
    root: path(ROOTS_DASHBOARD, '/marcas'),
    new: `${ROOTS_DASHBOARD}/marcas/nuevo`,
    modify: `${ROOTS_DASHBOARD}/marcas/modificar`,
  },
  products: {
    root: path(ROOTS_DASHBOARD, '/productos'),
    new: `${ROOTS_DASHBOARD}/productos/nuevo`,
    modify: `${ROOTS_DASHBOARD}/productos/modificar`,
  },
  providers: {
    root: path(ROOTS_DASHBOARD, '/proveedores'),
    new: `${ROOTS_DASHBOARD}/proveedores/nuevo`,
    modify: `${ROOTS_DASHBOARD}/proveedores/modificar`,
  },
  subsidiaries: {
    root: path(ROOTS_DASHBOARD, '/sucursales'),
    new: `${ROOTS_DASHBOARD}/sucursales/nuevo`,
    modify: `${ROOTS_DASHBOARD}/sucursales/modificar`,
  },
  sells: {
    root: path(ROOTS_DASHBOARD, '/ventas'),
    new: `${ROOTS_DASHBOARD}/ventas/nuevo`,
    modify: `${ROOTS_DASHBOARD}/ventas/modificar`,
  },
  discounts: {
    root: path(ROOTS_DASHBOARD, '/descuentos'),
    new: `${ROOTS_DASHBOARD}/descuentos/nuevo`,
    modify: `${ROOTS_DASHBOARD}/descuentos/modificar`,
    detail: `${ROOTS_DASHBOARD}/descuentos/detalle`,
  },
  reports: {
    root: path(ROOTS_DASHBOARD, '/reportes'),
    sales: path(ROOTS_DASHBOARD, '/reportes/ventas'),
    purchases: path(ROOTS_DASHBOARD, '/reportes/compras'),
    products: path(ROOTS_DASHBOARD, '/reportes/inventario'),
  },
  generalManagement: {
    root: path(ROOTS_DASHBOARD, '/administracion'),
    businessData: `${ROOTS_DASHBOARD}/administracion/datos-negocio`,
    invoiceBatching: `${ROOTS_DASHBOARD}/administracion/dosificacion-facturas`,
    sliderImages: `${ROOTS_DASHBOARD}/administracion/galeria-de-imagenes`,
  },
  defectiveProducts: {
    root: path(ROOTS_DASHBOARD, '/productos-defectuosos'),
    new: `${ROOTS_DASHBOARD}/productos-defectuosos/nuevo`,
  },
  shop: {
    root: path(ROOTS_SHOP),
    products: path(ROOTS_SHOP, `productos`),
    discounts: path(ROOTS_SHOP, `descuentos`),
    bestSelling: path(ROOTS_SHOP, `productos/mas-vendidos`),
    brands: path(ROOTS_SHOP, `marcas`),
    categories: path(ROOTS_SHOP, `categorias`),
    favorites: path(ROOTS_SHOP, `favoritos`),
    checkout: path(ROOTS_SHOP, `carro-de-compras`),
  },
  purchases: {
    root: path(ROOTS_DASHBOARD, '/compras'),
    new: `${ROOTS_DASHBOARD}/compras/nuevo`,
    modify: `${ROOTS_DASHBOARD}/compras/modificar`,
    detail: `${ROOTS_DASHBOARD}/compras/detalle`,
  },
  auth: {
    signUp: path(ROOTS_SHOP, 'registrarse'),
    verifyPhoneNumber: path(ROOTS_SHOP, 'verificar-numero-telefono'),
    signIn: path(ROOTS_SHOP, 'iniciar-sesion'),
    resetPassword: path(ROOTS_SHOP, 'recuperar-contraseña'),
    unauthorized: path(ROOTS_SHOP, 'no-autorizado'),
    profile: path(ROOTS_SHOP, 'perfil-usuario'),
  },
  staticPages: {
    about: path(ROOTS_SHOP, 'sobre-nosotros'),
    frequentlAskedQuestions: path(ROOTS_SHOP, 'preguntas-frecuentes'),
    warranties: path(ROOTS_SHOP, 'garantias'),
    devolutions: path(ROOTS_SHOP, 'devoluciones-cambios'),
    termConditions: path(ROOTS_SHOP, 'terminos-condiciones'),
  },
  notFound: '/404',
};
