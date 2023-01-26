import { Card, Container, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Page from '~/components/Page';
import ShopFilter from '~/components/shop/ShopFilter';
import ShopProductList from '~/components/shop/ShopProductList';
import { useGetCategoriesQuery } from '~/redux/api/categoriesApi';
import { useGetBestSellingProductsQuery } from '~/redux/api/productApi';
import { DEFAULT_CONFIG_NOTISTACK } from '~/utils/dataHandler';

function BestSellingProducts() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const bestSellingProducts = useGetBestSellingProductsQuery();
  const categories = useGetCategoriesQuery();
  useEffect(() => {
    if (!bestSellingProducts.isError) return;

    let msg = '';

    if (bestSellingProducts.error.error) msg = bestSellingProducts.error.error;

    enqueueSnackbar(msg, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }, [bestSellingProducts.isError]);
  return (
    <Page title="Productos mas vendidos">
      <Container sx={{ marginTop: '5rem' }} maxWidth="xl">
        <Grid container wrap="nowrap" gap={3}>
          <Grid item sm={2} md={2}>
            <ShopFilter loading={categories.isLoading} categories={categories.data} />
          </Grid>
          <Grid item sm={10} md={10}>
            <ShopProductList products={bestSellingProducts.data} loading={bestSellingProducts.isLoading} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default BestSellingProducts;
