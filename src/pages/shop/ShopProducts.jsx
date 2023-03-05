import { FilterList } from '@mui/icons-material';
import { Drawer, Grid, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MHidden, MIconButton } from '~/components/@material-extend';
import { useGetBrandsQuery } from '~/redux/api/brandsApi';
import { useGetCategoriesQuery } from '~/redux/api/categoriesApi';
import { setProducts } from '~/redux/slices/productsShop';
import { ShopContainerListProducts, ShopFilter, ShopNotFound, ShopNotMatch, ShopProductList } from '~/components/shop';
import { Scrollbar } from '~/components';
import { useGetProductsQuery } from '~/redux/api/productApi';
import useErrorMessage from '~/hooks/useErrorMessage';

function ShopProducts() {
  const theme = useTheme();
  const BOX_SHADOW = theme.palette.type === 'light' ? theme.shadows[1] : theme.shadows[10];

  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const { productsFiltered } = useSelector(({ products }) => products);
  const products = useGetProductsQuery();
  const categories = useGetCategoriesQuery();
  const brands = useGetBrandsQuery();
  useErrorMessage({ errors: [products.error, categories.error, brands.error] });

  const handleOpenFilter = () => {
    setOpenFilter((openFilter) => !openFilter);
  };

  const handleCloseFilter = () => {
    setOpenFilter(() => false);
  };

  useEffect(() => {
    if (!products.data) return;
    dispatch(setProducts(products.data));
  }, [products.data]);

  return (
    <ShopContainerListProducts
      title="Productos"
      titleContainer="Productos"
      loading={categories.isLoading || brands.isLoading}
      error={categories.isError || brands.isError || products.isError}
    >
      {products.data?.length && !products.isLoading ? (
        <>
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
                  loading={brands.isLoading || categories.isLoading || products.isLoading}
                  brands={brands.data}
                  categories={categories.data}
                  products={products.data}
                  include={['priceRange', 'brands', 'categories', 'orderBy']}
                  handleCloseFilterMobile={handleCloseFilter}
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
                  loading={brands.isLoading || categories.isLoading || products.isLoading}
                  brands={brands.data}
                  categories={categories.data}
                  products={products.data}
                  include={['priceRange', 'brands', 'categories', 'orderBy']}
                />
              </Scrollbar>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10}>
              {!productsFiltered.length ? (
                <ShopNotMatch />
              ) : (
                <ShopProductList products={productsFiltered} loading={products.isLoading} />
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <ShopNotFound />
      )}
    </ShopContainerListProducts>
  );
}

export default ShopProducts;
