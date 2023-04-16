import { Button, Container, Typography } from '@mui/material';
import Page from '~/components/Page';
import ShopMainSection from '~/components/shop/ShopMainSection';
import ShopProductList from '~/components/shop/ShopProductList';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetBestSellingProductsQuery, useGetProductsQuery } from '~/redux/api/productApi';
import { setProducts } from '~/redux/slices/productsShop';
import { useSnackbar } from 'notistack';
import { DEFAULT_CONFIG_NOTISTACK, isValidDiscount } from '~/utils/dataHandler';
import { Link } from 'react-router-dom';
import { PATH_MODULES } from '~/routes/paths';
import { ERRORS } from '~/constants/handleError';
import { useGetDiscountsQuery } from '~/redux/api/discountsApi';

export default function Shop() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const bestSellingProducts = useGetBestSellingProductsQuery();
  const productsData = useGetProductsQuery();
  const productsDiscounts = useGetDiscountsQuery();
  const someBestSellingProducts = bestSellingProducts.data?.slice(0, 5) ?? [];
  useEffect(() => {
    if (!productsData.isError || !bestSellingProducts.isError) return;

    enqueueSnackbar(ERRORS.FETCH_ERROR, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }, [productsData.isError, bestSellingProducts.isError]);

  useEffect(() => {
    if (productsData.isSuccess) {
      dispatch(setProducts(productsData.data));
    }
  }, [productsData.isSuccess]);

  return (
    <Page>
      <Container sx={{ marginTop: 18, mb: 3 }}>
        <ShopMainSection titleSidebar="Categorias" />

        <Typography variant="h4" component="h2" sx={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          Productos mas vendidos
          <Button
            color="primary"
            variant="outlined"
            size="small"
            sx={{ marginLeft: '1rem' }}
            LinkComponent={Link}
            to={PATH_MODULES.shop.bestSelling}
          >
            Ver mas
          </Button>
        </Typography>
        <ShopProductList products={someBestSellingProducts} loading={bestSellingProducts.isLoading} />
        {!productsDiscounts.isLoading &&
          !productsDiscounts.isError &&
          productsDiscounts.data
            .filter((product) => isValidDiscount(product))
            .filter(({ estado }) => estado === 1)
            .map(({ nombre, id, productos }) => {
              return (
                <Fragment key={id}>
                  <Typography variant="h4" component="h2" sx={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    {nombre}
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ marginLeft: '1rem' }}
                      LinkComponent={Link}
                      to={`${PATH_MODULES.shop.discounts}/${id}`}
                    >
                      Ver mas
                    </Button>
                  </Typography>
                  <ShopProductList products={productos} loading={productsDiscounts.isLoading} />
                </Fragment>
              );
            })}
      </Container>
    </Page>
  );
}
