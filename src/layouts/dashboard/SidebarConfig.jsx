// routes
import { PATH_MODULES } from '~/routes/paths';
// components
import SvgIconStyle from '~/components/SvgIconStyle';

// ---------------------------------------------------------------------

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
  setting: getIcon('ic_setting'),
  sell: getIcon('ic_sell'),
  discount: getIcon('ic_discount'),
  report: getIcon('ic_analytics'),
};

const sidebarConfig = [
  {
    subheader: 'modulos',
    items: [
      { title: 'App', path: PATH_MODULES.app, icon: ICONS.dashboard },
      { title: 'Clientes', path: PATH_MODULES.customers.root, icon: ICONS.user },
      { title: 'Empleados', path: PATH_MODULES.employees.root, icon: ICONS.employee },
      { title: 'Categorias', path: PATH_MODULES.categories.root, icon: ICONS.category },
      { title: 'Marcas', path: PATH_MODULES.brands.root, icon: ICONS.brand },
      { title: 'Productos', path: PATH_MODULES.products.root, icon: ICONS.product },
      { title: 'Proveedores', path: PATH_MODULES.providers.root, icon: ICONS.provider },
      { title: 'Sucursales', path: PATH_MODULES.subsidiaries.root, icon: ICONS.subsidiary },
      { title: 'Ventas', path: PATH_MODULES.sells.root, icon: ICONS.sell },
      { title: 'Descuentos', path: PATH_MODULES.discounts.root, icon: ICONS.discount },
      {
        title: 'Reportes',
        path: PATH_MODULES.reports.root,
        icon: ICONS.report,
        children: [
          { title: 'Reporte de ventas', path: PATH_MODULES.reports.sales },
          { title: 'Reporte de compras', path: PATH_MODULES.reports.purchases },
          { title: 'Reporte del inventario', path: PATH_MODULES.reports.products },
        ],
      },
      {
        title: 'Administración General',
        path: PATH_MODULES.generalManagement.root,
        icon: ICONS.setting,
        children: [
          { title: 'Datos del negocio', path: PATH_MODULES.generalManagement.businessData },
          { title: 'Dosificación de facturas', path: PATH_MODULES.generalManagement.invoiceBatching },
        ],
      },
    ],
  },
];

export default sidebarConfig;
