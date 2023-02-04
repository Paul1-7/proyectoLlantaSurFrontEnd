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

const PADDING = 2.5;

export default function MenuMobile({ isOffset, isHome, navConfig }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <NavSection navConfig={navConfig} sx={{ paddingBottom: '2rem', pr: 1 }} />
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
