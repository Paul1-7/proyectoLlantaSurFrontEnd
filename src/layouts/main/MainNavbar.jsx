import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { Box, AppBar, Toolbar, Container, Badge, styled } from '@mui/material';
// hooks
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalQuantity } from '~/redux/slices/productsShop';
import { useEffect } from 'react';
import useOffSetTop from '~/hooks/useOffSetTop';
// components
import Logo from '~/components/Logo';
import { MHidden, MIconButton } from '~/components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

export default function MainNavbar() {
  const { checkout } = useSelector(({ products }) => products);
  const dispatch = useDispatch();
  const isOffset = useOffSetTop(100);
  console.log('TCL: MainNavbar -> isOffset', isOffset);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    dispatch(getTotalQuantity());
  }, [checkout.cart]);

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          // ...(isOffset && {
          //   bgcolor: 'background.default',
          //   height: { md: APP_BAR_DESKTOP - 16 },
          // }),
          bgcolor: 'background.default',
          height: { md: APP_BAR_DESKTOP - 16 },
          borderBottom: '1px solid rgba(255, 255, 255,0.10)',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>

          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
          <MIconButton size="large" color="default">
            <Badge badgeContent={checkout.totalQuantity} color="error">
              <ShoppingCart />
            </Badge>
          </MIconButton>
          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}