import { Container, Stack, Typography } from '@mui/material';
import Page from '~/components/Page';
import ShopMainSection from '~/components/shop/ShopMainSection';
import ShopProductList from '~/components/shop/ShopProductList';
import ShopProductSearch from '~/components/shop/ShopProductSearch';
import ShopTagFiltered from '~/components/shop/ShopTagFiltered';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '~/redux/api/productApi';
import { setProducts } from '~/redux/slices/productsShop';
import { useSnackbar } from 'notistack';
import { DEFAULT_CONFIG_NOTISTACK } from '~/utils/dataHandler';

export default function Shop() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const productsData = useGetProductsQuery();

  if (productsData.isError) {
    const msg = productsData.error.error;
    enqueueSnackbar(msg, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }

  const { products, sortBy, filters } = useSelector((state) => state.products);

  useEffect(() => {
    if (productsData.isSuccess) {
      dispatch(setProducts(productsData.data));
    }
  }, [productsData.isSuccess]);

  const filteredProducts = products;
  // applyFilter(products, sortBy, filters);

  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
  };

  const [openFilter, setOpenFilter] = useState(false);
  const methods = useForm({
    defaultValues,
  });
  const { reset, watch, setValue } = methods;

  const values = watch();
  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  return (
    <Page>
      <Container>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2, paddingTop: '5rem' }}
        >
          <ShopProductSearch />
          {/*
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              <ShopFilterSidebar
                onResetAll={handleResetFilter}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
              />
            </FormProvider>

            <ShopProductSort />
          </Stack> */}
        </Stack>
        <ShopMainSection titleSidebar="Categorias" />
        <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{filteredProducts.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                // onRemoveGender={handleRemoveGender}
                // onRemoveCategory={handleRemoveCategory}
                // onRemoveColor={handleRemoveColor}
                // onRemovePrice={handleRemovePrice}
                // onRemoveRating={handleRemoveRating}
                // onResetAll={handleResetFilter}
              />
            </>
          )}
        </Stack>

        <ShopProductList products={filteredProducts} loading={productsData.isLoading && isDefault} />
        {/* <CartWidget /> */}
      </Container>
    </Page>
  );
}
