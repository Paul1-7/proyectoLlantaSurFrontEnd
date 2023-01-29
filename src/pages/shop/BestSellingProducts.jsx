import { Card, Container, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '~/components/Page';
import ShopFilter from '~/components/shop/ShopFilter';
import ShopProductList from '~/components/shop/ShopProductList';
import { ERRORS } from '~/constants/handleError';
import { useGetBrandsQuery } from '~/redux/api/brandsApi';
import { useGetCategoriesQuery } from '~/redux/api/categoriesApi';
import { useGetBestSellingProductsQuery } from '~/redux/api/productApi';
import { setProducts } from '~/redux/slices/productsShop';
import { DEFAULT_CONFIG_NOTISTACK } from '~/utils/dataHandler';

function BestSellingProducts() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { productsFiltered } = useSelector(({ products }) => products);
  const bestSellingProducts = useGetBestSellingProductsQuery();
  const brands = useGetBrandsQuery();
  const categories = useGetCategoriesQuery();

  useEffect(() => {
    const products = bestSellingProducts.data;
    if (!products) return;
    dispatch(setProducts(products));
  }, [bestSellingProducts.data]);

  useEffect(() => {
    console.log('ss');
    if (!bestSellingProducts.isError) return;

    enqueueSnackbar(ERRORS.FETCH_ERROR, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }, [bestSellingProducts.isError]);
  return (
    <Page title="Productos mas vendidos">
      <Container sx={{ marginTop: '5rem' }} maxWidth="xl">
        <Grid container wrap="nowrap" gap={3}>
          <Grid item sm={2} md={2}>
            <ShopFilter
              loading={categories.isLoading || brands.isLoading || bestSellingProducts.isLoading}
              categories={categories.data}
              brands={brands.data}
              products={bestSellingProducts.data}
            />
          </Grid>
          <Grid item sm={10} md={10}>
            <ShopProductList products={productsFiltered} loading={bestSellingProducts.isLoading} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default BestSellingProducts;
