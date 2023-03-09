import { Link, useParams } from 'react-router-dom';
import { Stack, Box, Typography, Divider, Button, Tab, TextField } from '@mui/material';
import { Image } from '~/components';
import { useGetProductQuery } from '~/redux/api/productApi';
import { ShopContainerListProducts, ShopCardReview, ShopReviewForm } from '~/components/shop';
import { getBOBCurrency, isValidDiscount, productAmount } from '~/utils/dataHandler';
import { AddShoppingCart, LocalMall } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import schema from '~/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_MODULES } from '~/routes/paths';
import { useDispatch } from 'react-redux';
import { addCart } from '~/redux/slices/productsShop';

export default function ShopProductDetails() {
  const dispatch = useDispatch();
  const [openModalReview, setOpenModalReview] = useState(false);

  const handleOpenModalReview = () => {
    setOpenModalReview(() => true);
  };
  const handleCloseModalReview = () => {
    setOpenModalReview(() => false);
  };

  const { id } = useParams();
  const product = useGetProductQuery(id);

  const [tabs, setTabs] = useState('1');
  const { register, formState, watch } = useForm({
    resolver: yupResolver(schema.amountValidation(productAmount(product.data))),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: { amount: 1 },
  });

  const handleChangeTabs = (_, newValue) => {
    setTabs(() => newValue);
  };

  const example = [
    {
      id: 1,
      user: 'un sor',
      rating: 3,
      title: 'Great product',
      description: 'Great product description',
      date: '11-12-2023',
    },
    {
      id: 2,
      user: 'un sor',
      rating: 5,
      title: 'nice product',
      description: 'nice product description',
      date: '11-12-2023',
    },
  ];

  return (
    <ShopContainerListProducts title={product.data?.nombre} error={product.isError} loading={product.isLoading}>
      <ShopReviewForm handleOpen={openModalReview} handleClose={handleCloseModalReview} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flexGrow: 1, p: 2 }}>
        <Box>
          <Image
            src={product.data?.imagen}
            alt="image of product"
            sx={{ width: { xs: '100%', sm: '50vw', md: '30rem', lg: '35rem' } }}
            ratio="1/1"
          />
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }} justifyContent="center">
          <Typography variant="h3" component="h1">
            {product.data?.nombre}
          </Typography>
          <Divider />

          <Stack spacing={2}>
            <Stack direction="row" gap={2} alignItems="end">
              <Typography variant="h3" component="p">
                <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Precio: </span>
                {getBOBCurrency(product.data?.precioVenta)}
              </Typography>
              {!!product.data?.descuentos?.length &&
                isValidDiscount(product.data?.descuentos)(
                  <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through', pr: 2 }}>
                    {getBOBCurrency(product.data?.descuentos?.at(0)?.precioDesc)}
                  </Typography>,
                )}
            </Stack>
            <Typography variant="h6" component="p">
              Marca:
              <span style={{ fontWeight: 'normal' }}> {product.data?.marca?.nombre} </span>
            </Typography>
            <Typography variant="h6" component="p">
              Categoria:
              <span style={{ fontWeight: 'normal' }}> {product.data?.categoria?.nombre}</span>
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography variant="h6" component="p">
                Cantidad:
              </Typography>
              <TextField
                type="number"
                size="small"
                sx={{ width: '5rem' }}
                error={!!formState.errors?.amount}
                helperText={formState.errors?.amount?.message}
                {...register('amount')}
                FormHelperTextProps={{
                  sx: { position: 'absolute', width: '15rem', left: '-6.5rem', bottom: '-1rem' },
                }}
              />
              <Typography variant="caption" component="p">
                {product.data?.descuentos?.at(0)?.cantMax ?? productAmount(product.data)} Disponibles
              </Typography>
            </Stack>

            <Typography variant="h6" component="p">
              Precio total:
              <span style={{ fontWeight: 'normal' }}> {getBOBCurrency(product.data?.precioVenta)} </span>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', sm: 'start' }}>
            <Button
              variant="outlined"
              onClick={() => dispatch(addCart({ ...product.data, addQuantity: watch('amount') }))}
              color="primary"
              startIcon={<AddShoppingCart />}
            >
              Agregar al carrito
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<LocalMall />}
              LinkComponent={Link}
              to={PATH_MODULES.shop.checkout}
            >
              Compralo Ahora
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ width: '100%', px: 2 }}>
        <TabContext value={tabs}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTabs} aria-label="tabs description and reviews">
              <Tab label="Descripcion" value="1" sx={{ typography: 'h6' }} />
              <Tab label="Reviews" value="2" sx={{ typography: 'h6' }} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ pt: 2 }}>
            {product.data?.descripcion}
          </TabPanel>
          <TabPanel value="2" sx={{ pt: 2 }}>
            <Button variant="outlined" sx={{ mb: 1 }} onClick={handleOpenModalReview}>
              Valora este producto
            </Button>
            {!example.length && <Typography align="center">No hay valoraciones de este producto</Typography>}
            {example.map((review) => (
              <ShopCardReview data={review} key={review.id} />
            ))}
          </TabPanel>
        </TabContext>
      </Box>
    </ShopContainerListProducts>
  );
}
