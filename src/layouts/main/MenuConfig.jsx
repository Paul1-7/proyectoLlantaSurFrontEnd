import { Icon } from '@iconify/react';
import dashboard from '@iconify/icons-ic/baseline-space-dashboard';
import cubeFill from '@iconify/icons-eva/cube-fill';
import tire from '~/assets/icons/tire.svg';
// routes
import { PATH_MODULES } from '~/routes/paths';
import SvgIconStyle from '~/components/SvgIconStyle';
import { Person, PersonAdd } from '@mui/icons-material';
import { ROLES } from '~/config';

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Productos',
    path: PATH_MODULES.shop.products,
    icon: <SvgIconStyle src={tire} {...ICON_SIZE} />,
  },

  {
    title: 'Categorias',
    path: PATH_MODULES.shop.categories,
    icon: <Icon icon={cubeFill} {...ICON_SIZE} />,
    children: [],
  },
  { title: 'Dashboard', path: PATH_MODULES.root, icon: <Icon icon={dashboard} {...ICON_SIZE} /> },
  {
    title: 'Registrarse',
    path: PATH_MODULES.auth.verifyPhoneNumber,
    icon: <PersonAdd sx={{ ...ICON_SIZE }} />,
  },
  {
    title: 'Iniciar sesión',
    path: PATH_MODULES.auth.signIn,
    icon: <Person sx={{ ...ICON_SIZE }} />,
  },
];

export const navItemsToActiveSesion = (navItems, auth) => {
  const { roles = [] } = auth?.user ?? {};
  const { CLIENTE } = ROLES;

  let activeSesionNavItems = [...navItems];
  if ((roles.length === 1 && roles.includes(CLIENTE.id)) || roles.length === 0) {
    activeSesionNavItems = activeSesionNavItems.filter(({ title }) => title !== 'Dashboard');
  }

  if (roles.length > 0) {
    activeSesionNavItems = activeSesionNavItems.filter(
      ({ title }) => !(title === 'Registrarse' || title === 'Iniciar sesión'),
    );
  }

  return activeSesionNavItems;
};

export default menuConfig;
