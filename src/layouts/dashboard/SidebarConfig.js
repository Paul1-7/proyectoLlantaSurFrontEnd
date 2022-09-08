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
  employee: getIcon('ic_employee')
};

const sidebarConfig = [
  {
    subheader: 'modulos',
    items: [
      { title: 'App', path: PATH_MODULES.modulos.app, icon: ICONS.dashboard },
      { title: 'Clientes', path: PATH_MODULES.modulos.clientes.root, icon: ICONS.user },
      { title: 'Empleados', path: PATH_MODULES.modulos.empleados, icon: ICONS.employee }
    ]
  }
];

export default sidebarConfig;
