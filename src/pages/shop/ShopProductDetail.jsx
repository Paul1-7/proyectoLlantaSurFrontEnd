import { useParams } from 'react-router-dom';
import { Stack, Box, Typography, Divider, Button, Tab, TextField } from '@mui/material';
import { Image } from '~/components';
import { useGetProductQuery } from '~/redux/api/productApi';
import { ShopContainerListProducts, ShopReviewForm } from '~/components/shop';
import { getBOBCurrency, isCurrentDateInRange, isValidDiscount, productAmount } from '~/utils/dataHandler';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import schema from '~/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '~/hooks/useAuth';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAxios from '~/hooks/useAxios';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import { useSnackbar } from 'notistack';

function isFavoriteProductToUser(idCliente, favorites = []) {
  return favorites.some((favorite) => favorite.idCliente === idCliente);
}

const customsDiscounts = (products) => {
  return products
    .map(({ descuento, cantMax, precio: precioDesc }) => ({ ...descuento, cantMax, precioDesc }))
    .filter(({ fechaInicio, fechaFin }) => isCurrentDateInRange(fechaInicio, fechaFin));
};

const customDetailProduct = ({ data: product }) => {
  return { data: { ...product, descuentos: customsDiscounts(product.descuentosProductos) } };
};

export default function ShopProductDetails() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const [resPostFavorite, errorPostFavorite, , axiosFetchPostFavorite] = useAxios();
  const [resGetFavorite, errorGetFavorite, loadingGetFavorite, axiosFetchGetFavorite] = useAxios({
    responseCb: customDetailProduct,
  });

  const { idUsuario } = auth?.user ?? {};
  const [openModalReview, setOpenModalReview] = useState(false);
  useSnackBarMessage({
    errors: [errorPostFavorite, errorGetFavorite],
  });

  const productAvailability = resGetFavorite?.descuentos?.at(0)?.cantMax ?? productAmount(resGetFavorite);

  const handleCloseModalReview = () => {
    setOpenModalReview(() => false);
  };

  const { id } = useParams();
  const dataFavorite = { idCliente: idUsuario, idProd: id };

  const product = useGetProductQuery(id);

  const [tabs, setTabs] = useState('1');
  const { register, formState } = useForm({
    resolver: yupResolver(schema.amountValidation(productAmount(product.data))),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: { amount: 1 },
  });

  const handleChangeTabs = (_, newValue) => {
    setTabs(() => newValue);
  };

  useEffect(() => {
    axiosFetchGetFavorite({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos/${id}`,
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(resPostFavorite)) return;

    axiosFetchGetFavorite({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos/${id}`,
    });
  }, [resPostFavorite]);

  useEffect(() => {
    if (Array.isArray(resPostFavorite)) return;

    enqueueSnackbar(resPostFavorite?.message, {
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      autoHideDuration: 4000,
      variant: 'success',
    });
  }, [resPostFavorite]);

  const onSubmitAddFavorite = () => {
    axiosFetchPostFavorite({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/favoritos`,
      requestConfig: {
        ...dataFavorite,
      },
    });
  };
  const onSubmitRemoveFavorite = () => {
    if (Array.isArray(resGetFavorite)) return;
    axiosFetchPostFavorite({
      axiosInstance: axiosPrivate,
      method: 'DELETE',
      url: `/api/v1/favoritos/${resGetFavorite.favoritos.at(0).id}`,
    });
  };

  return (
    <ShopContainerListProducts title={resGetFavorite?.nombre} loading={loadingGetFavorite}>
      <ShopReviewForm handleOpen={openModalReview} handleClose={handleCloseModalReview} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flexGrow: 1, p: 2 }}>
        <Box>
          <Image
            src={resGetFavorite?.imagen}
            alt="image of product"
            sx={{ width: { xs: '100%', sm: '50vw', md: '30rem', lg: '35rem' } }}
            ratio="1/1"
          />
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }} justifyContent="center">
          <Typography variant="h3" component="h1">
            {resGetFavorite?.nombre}
          </Typography>
          <Divider />

          <Stack spacing={2}>
            <Stack direction="row" gap={2} alignItems="end">
              <Typography variant="h3" component="p">
                <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Precio: </span>
                {getBOBCurrency(resGetFavorite?.precioVenta)}
              </Typography>
              {!!resGetFavorite?.descuentos?.length && isValidDiscount(resGetFavorite?.descuentos) && (
                <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through', pr: 2 }}>
                  {getBOBCurrency(resGetFavorite?.descuentos?.at(0)?.precioDesc)}
                </Typography>
              )}
            </Stack>
            <Typography variant="h6" component="p">
              Marca:
              <span style={{ fontWeight: 'normal' }}> {resGetFavorite?.marca?.nombre} </span>
            </Typography>
            <Typography variant="h6" component="p">
              Categoria:
              <span style={{ fontWeight: 'normal' }}> {resGetFavorite?.categoria?.nombre}</span>
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
                {productAvailability} Disponibles
              </Typography>
            </Stack>

            <Typography variant="h6" component="p">
              Precio total:
              <span style={{ fontWeight: 'normal' }}> {getBOBCurrency(resGetFavorite?.precioVenta)} </span>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', sm: 'start' }}>
            {/* <Button
              variant="outlined"
              onClick={() => dispatch(addCart({ ...product, addQuantity: watch('amount') }))}
              color="primary"
              startIcon={<AddShoppingCart />}
              disabled={!productAvailability}
            >
              Agregar al carrito
            </Button> */}
            {isFavoriteProductToUser(idUsuario, resGetFavorite?.favoritos) ? (
              <Button variant="outlined" color="primary" onClick={onSubmitRemoveFavorite} startIcon={<Favorite />}>
                Eliminar de favoritos
              </Button>
            ) : (
              <Button variant="outlined" color="primary" onClick={onSubmitAddFavorite} startIcon={<FavoriteBorder />}>
                Agregar a favoritos
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ width: '100%', px: 2 }}>
        <TabContext value={tabs}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTabs} aria-label="tabs description and reviews">
              <Tab label="Descripcion" value="1" sx={{ typography: 'h6' }} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ pt: 2 }}>
            {resGetFavorite?.descripcion}
          </TabPanel>
        </TabContext>
      </Box>
    </ShopContainerListProducts>
  );
}
