import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { SnackBar } from '~/components';
import FavoriteProductList from '~/components/checkout/FavoriteProductList';
import { ShopContainerListProducts } from '~/components/shop';
import useAuth from '~/hooks/useAuth';
import useAxios from '~/hooks/useAxios';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';

function ShopFavorites() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { idUsuario } = auth?.user ?? {};
  const [resGetFavorite, errorGetFavorite, loadingGetFavorite, axiosFetchGetFavorite, setResGetFavorite] = useAxios();
  const [resDeleteFavorite, errorDeleteFavorite, , axiosFetchDeleteFavorite] = useAxios();

  useEffect(() => {
    axiosFetchGetFavorite({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/favoritos/${idUsuario}`,
    });
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  useSnackBarMessage({
    errors: [errorGetFavorite, errorDeleteFavorite],
  });

  function deleteFavorite(id) {
    axiosFetchDeleteFavorite({
      axiosInstance: axiosPrivate,
      method: 'DELETE',
      url: `/api/v1/favoritos/${id}`,
    });
  }

  useEffect(() => {
    if (Array.isArray(resDeleteFavorite)) return;

    enqueueSnackbar(resDeleteFavorite?.message, {
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      autoHideDuration: 5000,
      content: (key, message) => <SnackBar id={key} message={message} severity="success" />,
    });
    setResGetFavorite(resGetFavorite.filter(({ id }) => id !== resDeleteFavorite.id));
  }, [resDeleteFavorite]);

  return (
    <ShopContainerListProducts title="Favoritos" titleContainer="Favoritos" loading={loadingGetFavorite}>
      {!loadingGetFavorite && !resGetFavorite.length ? (
        <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography align="center">No tienes productos guardados</Typography>
        </Box>
      ) : (
        <FavoriteProductList products={resGetFavorite} onDelete={deleteFavorite} sx={{ pt: 4 }} />
      )}
    </ShopContainerListProducts>
  );
}

export default ShopFavorites;
