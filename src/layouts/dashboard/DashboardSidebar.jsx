import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { Box, Stack, Drawer, Tooltip, CardActionArea, alpha, styled } from '@mui/material';
// hooks
import useCollapseDrawer from '~/hooks/useCollapseDrawer';

import { MHidden } from '~/components/@material-extend';
import { AccountUserCard, NavSection, Scrollbar, Logo, Avatar } from '~/components';
import useAuth from '~/hooks/useAuth';
import sidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex,
    }),
  },
}));

function IconCollapse({ onToggleCollapse, collapseClick }) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2,
          }),
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0,
            }),
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

IconCollapse.propTypes = {
  onToggleCollapse: PropTypes.func,
  collapseClick: PropTypes.bool,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { auth } = useAuth();
  const { nombre, apellido, roles } = auth?.user ?? {};

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center',
          }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-evenly">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo sx={{ display: 'flex', alignItems: 'center', ...(isCollapse && { height: '30px' }) }} />
          </Box>

          <MHidden width="lgDown">
            {!isCollapse && <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />}
          </MHidden>
        </Stack>

        {auth?.user &&
          (isCollapse ? (
            <Avatar name={`${nombre} ${apellido}`} />
          ) : (
            <AccountUserCard data={{ name: `${nombre} ${apellido}`, roles }} />
          ))}
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} sx={{ paddingBottom: '2rem', pr: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88),
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};
