import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Box, Grid, Card, Button, Typography, CircularProgress } from '@mui/material';
// redux

import { onBackStep, onNextStep } from '~/redux/slices/productsShop';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import useAxios from '~/hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PATH_MODULES } from '~/routes/paths';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import CheckoutSummary from './CheckoutSummary';

function AddressItem({ onNextStep, onCreateBilling = null }) {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();
  useSnackBarMessage({
    errors: [errorGet],
  });

  const handleCreateBilling = () => {
    // onCreateBilling(address);
    onNextStep();
  };

  useEffect(() => {
    if (!auth?.user)
      navigate(PATH_MODULES.auth.signIn, {
        replace: true,
      });

    axiosFetchGet({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/clientes/${auth?.user?.idUsuario}`,
    });
  }, []);

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      {loadingGet ? (
        <Box sx={{ height: '10.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            Direccion de envío
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Para: {`${resGet?.nombre} ${resGet?.apellido}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            NIT/CI/CEX: {resGet?.ciNit}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Direccion: {resGet?.direccion}
          </Typography>
          <Typography variant="body1">Telefono: {resGet?.celular}</Typography>
        </>
      )}
    </Card>
  );
}

AddressItem.propTypes = {
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function CheckoutBillingAddress() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.products);
  const { total, discount, subtotal } = checkout;

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const address = {
    customer: '2',
    fullAddress: 'ss',
    phone: '334',
    ci: '2232',
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <AddressItem address={address} onNextStep={handleNextStep} />
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
        <Button fullWidth size="large" type="submit" variant="contained" onClick={handleNextStep}>
          Siguiente
        </Button>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
        <Button size="small" color="inherit" onClick={handleBackStep} startIcon={<Icon icon={arrowIosBackFill} />}>
          Atras
        </Button>
      </Box>
    </Grid>
  );
}
