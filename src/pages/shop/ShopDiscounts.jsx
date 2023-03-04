import { FilterList } from '@mui/icons-material';
import { Drawer, Grid, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MHidden, MIconButton } from '~/components/@material-extend';
import Scrollbar from '~/components/Scrollbar';
import { ShopFilter, ShopProductList, ShopContainerListProducts } from '~/components/shop';
import { ERRORS } from '~/constants/handleError';
import { useGetBrandsQuery } from '~/redux/api/brandsApi';
import { useGetCategoriesQuery } from '~/redux/api/categoriesApi';
import { useGetDiscountQuery } from '~/redux/api/discountsApi';
import { setProducts } from '~/redux/slices/productsShop';
import { DEFAULT_CONFIG_NOTISTACK } from '~/utils/dataHandler';

function ShopDiscounts() {
  const theme = useTheme();
  const BOX_SHADOW = theme.palette.type === 'light' ? theme.shadows[1] : theme.shadows[10];
  const { id } = useParams();
  const [openFilter, setOpenFilter] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { productsFiltered } = useSelector(({ products }) => products);
  const discountData = useGetDiscountQuery(id);
  const brands = useGetBrandsQuery();
  const categories = useGetCategoriesQuery();

  const handleOpenFilter = () => {
    setOpenFilter((openFilter) => !openFilter);
  };

  const handleCloseFilter = () => {
    setOpenFilter(() => false);
  };

  useEffect(() => {
    const { productos } = discountData.data || {};
    if (!productos) return;
    dispatch(setProducts(productos));
  }, [discountData.data]);

  useEffect(() => {
    if (!discountData.isError) return;

    enqueueSnackbar(ERRORS.FETCH_ERROR, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }, [discountData.isError]);
  return (
    <ShopContainerListProducts
      titleContainer={discountData.data?.nombre || 'Descuentos'}
      title={discountData.data?.nombre}
      loading={discountData.isLoading || brands.isLoading || categories.isLoading}
      error={discountData.isError || categories.isError || brands.isError}
    >
      {!!discountData.data?.productos?.length && (
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
                  loading={categories.isLoading || brands.isLoading || discountData.isLoading}
                  categories={categories.data}
                  brands={brands.data}
                  products={discountData.data}
                  include={['priceRange', 'brands', 'categories']}
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
                  loading={categories.isLoading || brands.isLoading || discountData.isLoading}
                  categories={categories.data}
                  brands={brands.data}
                  products={discountData.data.productos}
                  include={['priceRange', 'brands', 'categories']}
                />
              </Scrollbar>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10}>
              <ShopProductList products={productsFiltered} loading={discountData.isLoading} />
            </Grid>
          </Grid>
        </>
      )}
    </ShopContainerListProducts>
  );
}

export default ShopDiscounts;
