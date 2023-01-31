import { FilterList } from '@mui/icons-material';
import { Container, Drawer, Grid, Typography, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MHidden, MIconButton } from '~/components/@material-extend';
import Page from '~/components/Page';
import Scrollbar from '~/components/Scrollbar';
import ShopFilter from '~/components/shop/ShopFilter';
import ShopProductList from '~/components/shop/ShopProductList';
import { ERRORS } from '~/constants/handleError';
import { useGetBrandsQuery } from '~/redux/api/brandsApi';
import { useGetCategoriesQuery } from '~/redux/api/categoriesApi';
import { useGetBestSellingProductsQuery } from '~/redux/api/productApi';
import { setProducts } from '~/redux/slices/productsShop';
import { DEFAULT_CONFIG_NOTISTACK } from '~/utils/dataHandler';

function BestSellingProducts() {
  const theme = useTheme();
  const BOX_SHADOW = theme.palette.type === 'light' ? theme.shadows[1] : theme.shadows[10];
  const [openFilter, setOpenFilter] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { productsFiltered } = useSelector(({ products }) => products);
  const bestSellingProducts = useGetBestSellingProductsQuery();
  const brands = useGetBrandsQuery();
  const categories = useGetCategoriesQuery();

  const handleOpenFilter = () => {
    setOpenFilter((openFilter) => !openFilter);
  };

  const handleCloseFilter = () => {
    setOpenFilter(() => false);
  };

  useEffect(() => {
    const products = bestSellingProducts.data;
    if (!products) return;
    dispatch(setProducts(products));
  }, [bestSellingProducts.data]);

  useEffect(() => {
    if (!bestSellingProducts.isError) return;

    enqueueSnackbar(ERRORS.FETCH_ERROR, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }, [bestSellingProducts.isError]);
  return (
    <Page title="Productos mas vendidos">
      <Container sx={{ marginTop: '6rem', marginBottom: 4 }} maxWidth="xl">
        <Typography variant="h3">Productos mas vendidos</Typography>
        <MIconButton size="large" color="default" onClick={handleOpenFilter} sx={{ display: { sm: 'none' } }}>
          <FilterList />
        </MIconButton>
        <MHidden width="mdUp">
          <Drawer
            anchor="right"
            ModalProps={{
              keepMounted: true,
            }}
            onClose={handleCloseFilter}
            PaperProps={{ sx: { width: 260 } }}
            open={openFilter}
          >
            <Scrollbar sx={{ height: 1 }}>
              <ShopFilter
                loading={categories.isLoading || brands.isLoading || bestSellingProducts.isLoading}
                categories={categories.data}
                brands={brands.data}
                products={bestSellingProducts.data}
              />
            </Scrollbar>
          </Drawer>
        </MHidden>

        <Grid container wrap="nowrap" gap={3}>
          <Grid
            item
            sm={4}
            md={3}
            lg={2}
            sx={{
              display: { xs: 'none', sm: 'block' },
              height: 'calc(100vh - 4rem)',
              maxHeight: 'calc(100vh - 4rem)',

              boxShadow: BOX_SHADOW,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Scrollbar
              sx={{
                height: 1,
              }}
            >
              <ShopFilter
                loading={categories.isLoading || brands.isLoading || bestSellingProducts.isLoading}
                categories={categories.data}
                brands={brands.data}
                products={bestSellingProducts.data}
              />
            </Scrollbar>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <ShopProductList products={productsFiltered} loading={bestSellingProducts.isLoading} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default BestSellingProducts;
