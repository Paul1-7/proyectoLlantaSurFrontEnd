import { FilterList } from '@mui/icons-material';
import { Drawer, Grid, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MHidden, MIconButton } from '~/components/@material-extend';
import { ERRORS } from '~/constants/handleError';
import { useGetBrandsQuery } from '~/redux/api/brandsApi';
import { useGetCategoryByURLQuery } from '~/redux/api/categoriesApi';
import { setProducts } from '~/redux/slices/productsShop';
import { PATH_MODULES } from '~/routes/paths';
import { DEFAULT_CONFIG_NOTISTACK } from '~/utils/dataHandler';
import { ShopContainerListProducts, ShopFilter, ShopNotFound, ShopProductList } from '~/components/shop';
import { Scrollbar } from '~/components';

function ShopCategories() {
  const { url } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const BOX_SHADOW = theme.palette.type === 'light' ? theme.shadows[1] : theme.shadows[10];

  const [openFilter, setOpenFilter] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { productsFiltered } = useSelector(({ products }) => products);
  const categoryProducts = useGetCategoryByURLQuery(url);
  const brands = useGetBrandsQuery();

  const handleOpenFilter = () => {
    setOpenFilter((openFilter) => !openFilter);
  };

  const handleCloseFilter = () => {
    setOpenFilter(() => false);
  };

  useEffect(() => {
    const products = categoryProducts.data?.productos;
    if (!products) return;
    dispatch(setProducts(products));
  }, [categoryProducts.data]);

  useEffect(() => {
    if (!categoryProducts.isError) return;

    if (categoryProducts.error?.status === 404) {
      navigate(PATH_MODULES.notFound);
      return;
    }

    enqueueSnackbar(ERRORS.FETCH_ERROR, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }, [categoryProducts.isError]);

  return (
    <ShopContainerListProducts
      title={categoryProducts.data?.nombre}
      loading={categoryProducts.isLoading || brands.isLoading}
      error={categoryProducts.isError || brands.isError}
    >
      {categoryProducts.data?.productos.length && !categoryProducts.isLoading ? (
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
                  loading={brands.isLoading || categoryProducts.isLoading}
                  brands={brands.data}
                  products={categoryProducts.data?.productos}
                  include={['priceRange', 'brands', 'orderBy']}
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
                  loading={brands.isLoading || categoryProducts.isLoading}
                  brands={brands.data}
                  products={categoryProducts.data?.productos}
                  include={['priceRange', 'brands', 'orderBy']}
                />
              </Scrollbar>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10}>
              <ShopProductList products={productsFiltered} loading={categoryProducts.isLoading} />
            </Grid>
          </Grid>
        </>
      ) : (
        <ShopNotFound />
      )}
    </ShopContainerListProducts>
  );
}

export default ShopCategories;
