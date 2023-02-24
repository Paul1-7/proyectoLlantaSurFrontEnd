import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Box, Grid, Card, Button, Typography } from '@mui/material';
// redux

import { onBackStep, onNextStep } from '~/redux/slices/productsShop';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSummary from './CheckoutSummary';

function AddressItem({ address, onNextStep, onCreateBilling = null }) {
  const { customer, fullAddress, ci, phone } = address;

  const handleCreateBilling = () => {
    onCreateBilling(address);
    onNextStep();
  };

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Typography variant="subtitle1" gutterBottom>
        Para: {customer}
      </Typography>
      <Typography variant="body2" gutterBottom>
        NIT/CI/CEX: {ci}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Direccion: {fullAddress}
      </Typography>
      <Typography variant="body2">Telefono: {phone}</Typography>
    </Card>
  );
}

AddressItem.propTypes = {
  address: PropTypes.object,
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
