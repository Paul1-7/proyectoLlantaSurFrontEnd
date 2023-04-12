import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Box, Link, List, Stack, Popover, ListItem, styled, ListItemButton } from '@mui/material';
import useAuth from '~/hooks/useAuth';
import { ROLES } from '~/config';
import { navItemsToActiveSesion } from './MenuConfig';

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));

// ----------------------------------------------------------------------

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
        }}
      />
    </Box>
  );
}

IconBullet.propTypes = {
  type: PropTypes.oneOf(['subheader', 'item']),
};

function MenuDesktopItem({ item: value, pathname, isHome, isOpen, isOffset, onOpen, onClose, anchorEl }) {
  const { title, path, children } = value;
  const isActive = pathname === path;

  if (children) {
    return (
      <div key={title}>
        <LinkStyle
          onClick={onOpen}
          sx={{
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            ...(isHome && { color: 'text.primary' }),
            ...(isOffset && { color: 'text.primary' }),
            ...(isOpen && { opacity: 0.7 }),
          }}
        >
          {title}
          <Box
            component={Icon}
            icon={isOpen ? arrowIosUpwardFill : arrowIosDownwardFill}
            sx={{ ml: 0.5, width: 16, height: 16 }}
          />
        </LinkStyle>

        <Popover
          open={isOpen}
          anchorReference="anchorEl"
          anchorEl={anchorEl.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={onClose}
          PaperProps={{
            sx: {
              py: 2,
              mt: 3,
              borderRadius: 2,
              boxShadow: (theme) => theme.customShadows.z24,
            },
          }}
        >
          <List disablePadding>
            {children.map((item) => (
              <ListItem
                key={item.title}
                to={item.path}
                component={RouterLink}
                underline="none"
                sx={{
                  p: 0,
                  typography: 'body2',
                  color: 'text.secondary',
                  transition: (theme) => theme.transitions.create('color'),
                  '&:hover': { color: 'text.primary' },
                  ...(item.path === pathname && {
                    typography: 'subtitle2',
                    color: 'text.primary',
                  }),
                }}
              >
                <ListItemButton sx={{ px: 3 }}>{item.title}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Popover>
      </div>
    );
  }

  return (
    <LinkStyle
      key={title}
      to={path}
      component={RouterLink}
      sx={{
        ...(isHome && { color: 'text.primary' }),
        ...(isOffset && { color: 'primary.main' }),
        ...(isActive && { color: 'primary.main' }),
      }}
    >
      {title}
    </LinkStyle>
  );
}

MenuDesktopItem.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  anchorEl: PropTypes.object,
};

function isClientRol(roles = []) {
  roles.includes(ROLES.CLIENTE.id);

  return roles.length === 1 && roles.includes(ROLES.CLIENTE.id);
}

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
  const { auth, isExpiredToken } = useAuth();
  let navItems = navItemsToActiveSesion(navConfig, auth);

  if (isExpiredToken()) {
    navItems = navItems.filter(({ title }) => !(title === 'Registrarse' || title === 'Iniciar sesión'));
  }
  if (isClientRol(auth?.user.roles)) {
    navItems = navItems.filter(({ title }) => title !== 'Administración');
  }

  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef();
  const handleOpen = (event) => {
    setOpen(true);
    anchorEl.current = event.currentTarget;
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  return (
    <Stack direction="row">
      {navItems.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          anchorEl={anchorEl}
          pathname={pathname}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}

MenuDesktop.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array,
};
