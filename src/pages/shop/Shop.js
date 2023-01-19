// material
// import { styled } from '@material-ui/core/styles';
import { Box, Container, Stack, Typography } from '@material-ui/core';
import Page from 'components/Page';
import ShopMainSection from 'components/shop/ShopMainSection';
import ShopProductList from 'components/shop/ShopProductList';
import ShopProductSearch from 'components/shop/ShopProductSearch';
import ShopTagFiltered from 'components/shop/ShopTagFiltered';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from 'redux/api/productApi';
import { getProducts } from 'redux/slices/productsShop';

export default function Shop() {
  const dispatch = useDispatch();
  const { data: dataProducts, isLoading } = useGetProductsQuery();
  const { products, sortBy, filters } = useSelector((state) => state.products);
  console.log('TCL: Shop -> products', products);

  useEffect(() => {
    console.log('getproduct');
    if (!dataProducts) return;
    dispatch(getProducts(dataProducts));
  }, [dataProducts]);

  const filteredProducts = products;
  // applyFilter(products, sortBy, filters);

  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating
  };

  const [openFilter, setOpenFilter] = useState(false);
  const methods = useForm({
    defaultValues
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

        <ShopProductList products={filteredProducts} loading={isLoading && isDefault} />
        {/* <CartWidget /> */}
      </Container>
    </Page>
  );
}
