import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { Drawer, Link } from '@mui/material';
// components
import Logo from '~/components/Logo';
import NavSection from '~/components/NavSection';
import Scrollbar from '~/components/Scrollbar';
import { MIconButton } from '~/components/@material-extend';
import { AccountUserCard } from '~/components';
import useAuth from '~/hooks/useAuth';
import { ROLES } from '~/config';

const PADDING = 2.5;

function isClientRol(roles = []) {
  roles.includes(ROLES.CLIENTE.id);

  return roles.length === 1 && roles.includes(ROLES.CLIENTE.id);
}

export default function MenuMobile({ isOffset, isHome, navConfig }) {
  const { pathname } = useLocation();
  const { isExpiredToken, auth } = useAuth();
  const { nombre, apellido, roles } = auth?.user ?? {};
  const [mobileOpen, setMobileOpen] = useState(false);
  let navItems = [...navConfig];

  if (isExpiredToken()) {
    navItems = navItems.filter(({ title }) => !(title === 'Registrarse' || title === 'Iniciar sesión'));
  }

  if (isClientRol(auth?.user.roles)) {
    navItems = navItems.filter(({ title }) => title !== 'Administración');
  }

  if (!auth?.user.roles) {
    navItems = navItems.filter(({ title }) => title !== 'Administración');
  }

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    if (mobileOpen) {
      handleDrawerClose();
    }
  }, [pathname]);

  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'text.primary' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Icon icon={menu2Fill} />
      </MIconButton>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Link component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo sx={{ mx: PADDING, my: 3 }} />
          </Link>
          {auth?.user && <AccountUserCard data={{ name: `${nombre} ${apellido}`, roles }} sx={{ mx: 2 }} />}
          <NavSection navConfig={navItems} sx={{ paddingBottom: '2rem', pr: 1 }} />
        </Scrollbar>
      </Drawer>
    </>
  );
}

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array,
};
