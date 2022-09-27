// routes
import { PATH_MODULES } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

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
  category: getIcon('ic_category')
};

const sidebarConfig = [
  {
    subheader: 'modulos',
    items: [
      { title: 'App', path: PATH_MODULES.app, icon: ICONS.dashboard },
      { title: 'Clientes', path: PATH_MODULES.customers.root, icon: ICONS.user },
      { title: 'Empleados', path: PATH_MODULES.employees.root, icon: ICONS.employee },
      { title: 'Categorias', path: PATH_MODULES.categories.root, icon: ICONS.category }
    ]
  }
];

export default sidebarConfig;
