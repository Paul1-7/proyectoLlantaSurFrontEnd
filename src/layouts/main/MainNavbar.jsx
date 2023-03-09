import { Link, NavLink as RouterLink, useLocation } from 'react-router-dom';
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
import ShopProductSearch from '~/components/shop/ShopProductSearch';
import { useGetCategoriesQuery } from '~/redux/api/categoriesApi';
import { PATH_MODULES } from '~/routes/paths';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import AccountPopover from '../dashboard/AccountPopover';

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

const mergeCategoriesIntoMenu = (categories, menu) => {
  const categoriesMenu = categories?.map(({ nombre, url }) => ({
    title: nombre,
    path: `${PATH_MODULES.shop.categories}/${url}`,
  }));
  return menu.map((item) =>
    item.title === 'Categorias'
      ? {
          ...item,
          children: categoriesMenu,
        }
      : item,
  );
};

export default function MainNavbar() {
  const { checkout } = useSelector(({ products }) => products);
  const categories = useGetCategoriesQuery();
  const newMenuItems = mergeCategoriesIntoMenu(categories.data, navConfig);
  const dispatch = useDispatch();
  const isOffset = useOffSetTop(100);
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
          bgcolor: 'background.default',
          height: { xs: 120 },
          borderBottom: '1px solid rgba(255, 255, 255,0.10)',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/">
              <Logo sx={{ height: { xs: 30, sm: 50 }, mb: { xs: 0.5 } }} />
            </RouterLink>

            <Box sx={{ flexGrow: 1 }} />

            <MHidden width="mdDown">
              <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={[...newMenuItems]} isAuthenticated />
            </MHidden>
            <MIconButton size="large" color="default" LinkComponent={Link} to={PATH_MODULES.shop.checkout}>
              <Badge badgeContent={checkout.totalQuantity} color="error">
                <ShoppingCart />
              </Badge>
            </MIconButton>
            <AccountPopover />
            <MHidden width="mdUp">
              <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={[...newMenuItems.reverse()]} />
            </MHidden>
          </Box>
          <ShopProductSearch
            sx={{
              paddingTop: 0.5,
              width: { xs: '100vw' },
              paddingRight: { xs: 4, sm: 6, md: 16, lg: 22, xl: 56 },
            }}
          />
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
