// routes
import { PATH_MODULES } from '~/routes/paths';
// components
import SvgIconStyle from '~/components/SvgIconStyle';
import { ROLES } from '~/config';

const { ADMINISTRADOR, EMPLEADO_VENTAS } = ROLES;

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  employee: getIcon('ic_employee'),
  category: getIcon('ic_category'),
  brand: getIcon('ic_book'),
  product: getIcon('ic_product'),
  provider: getIcon('ic_provider'),
  subsidiary: getIcon('ic_subsidiary'),
  defectiveProduct: getIcon('ic_defectiveProduct'),
  setting: getIcon('ic_setting'),
  sell: getIcon('ic_sell'),
  discount: getIcon('ic_discount'),
  report: getIcon('ic_analytics'),
  purchase: getIcon('ic_purchase'),
};

const sidebarConfig = [
  { title: 'Dashboard', path: PATH_MODULES.app, icon: ICONS.dashboard, roles: [ADMINISTRADOR.id] },
  { title: 'Compras', path: PATH_MODULES.purchases.root, icon: ICONS.purchase, roles: [ADMINISTRADOR.id] },
  {
    title: 'Clientes',
    path: PATH_MODULES.customers.root,
    icon: ICONS.user,
    roles: [ADMINISTRADOR.id, EMPLEADO_VENTAS.id],
  },
  { title: 'Empleados', path: PATH_MODULES.employees.root, icon: ICONS.employee, roles: [ADMINISTRADOR.id] },
  { title: 'Categorias', path: PATH_MODULES.categories.root, icon: ICONS.category, roles: [ADMINISTRADOR.id] },
  { title: 'Marcas', path: PATH_MODULES.brands.root, icon: ICONS.brand, roles: [ADMINISTRADOR.id] },
  {
    title: 'Productos',
    path: PATH_MODULES.products.root,
    icon: ICONS.product,
    roles: [ADMINISTRADOR.id, EMPLEADO_VENTAS.id],
  },
  { title: 'Proveedores', path: PATH_MODULES.providers.root, icon: ICONS.provider, roles: [ADMINISTRADOR.id] },
  { title: 'Sucursales', path: PATH_MODULES.subsidiaries.root, icon: ICONS.subsidiary, roles: [ADMINISTRADOR.id] },
  { title: 'Ventas', path: PATH_MODULES.sells.root, icon: ICONS.sell, roles: [ADMINISTRADOR.id, EMPLEADO_VENTAS.id] },
  {
    title: 'Descuentos',
    path: PATH_MODULES.discounts.root,
    icon: ICONS.discount,
    roles: [ADMINISTRADOR.id, EMPLEADO_VENTAS.id],
  },
  {
    title: 'Productos defectuosos',
    path: PATH_MODULES.defectiveProducts.root,
    icon: ICONS.defectiveProduct,
    roles: [ADMINISTRADOR.id, EMPLEADO_VENTAS.id],
  },
  {
    title: 'Reportes',
    path: PATH_MODULES.reports.root,
    icon: ICONS.report,
    children: [
      { title: 'Reporte de ventas', path: PATH_MODULES.reports.sales, roles: [ADMINISTRADOR.id] },
      { title: 'Reporte de compras', path: PATH_MODULES.reports.purchases, roles: [ADMINISTRADOR.id] },
      { title: 'Reporte del inventario', path: PATH_MODULES.reports.products, roles: [ADMINISTRADOR.id] },
    ],
  },
  {
    title: 'Administración General',
    path: PATH_MODULES.generalManagement.root,
    icon: ICONS.setting,
    children: [
      { title: 'Datos del negocio', path: PATH_MODULES.generalManagement.businessData, roles: [ADMINISTRADOR.id] },
      {
        title: 'Dosificación de facturas',
        path: PATH_MODULES.generalManagement.invoiceBatching,
        roles: [ADMINISTRADOR.id],
      },
    ],
  },
];

export default sidebarConfig;
