import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Button } from '@mui/material';
// redux
import { onGotoStep, onBackStep, onNextStep } from '~/redux/slices/productsShop';
//
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import CheckoutSummary from './CheckoutSummary';

export default function CheckoutPayment() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.products);
  const { total, discount, subtotal, shipping } = checkout;

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  return (
    <form autoComplete="off" noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Button
            type="button"
            size="small"
            color="inherit"
            onClick={handleBackStep}
            startIcon={<Icon icon={arrowIosBackFill} />}
          >
            Atras
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* <CheckoutBillingInfo onBackStep={handleBackStep} /> */}
          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            onEdit={() => handleGotoStep(0)}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Complete Order
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
