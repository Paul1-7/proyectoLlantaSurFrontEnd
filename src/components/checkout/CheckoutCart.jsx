import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider } from 'react-hook-form';
import { decreaseQuantity, deleteCart, getSubTotal, increaseQuantity, onNextStep } from '~/redux/slices/productsShop';
import Scrollbar from '../Scrollbar';
import CheckoutProductList from './CheckoutProductList';
import EmptyContent from '../EmptyContent';
import CheckoutSummary from './CheckoutSummary';

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.products);
  const { cart, total, subtotal } = checkout;
  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
    dispatch(getSubTotal());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
    dispatch(getSubTotal());
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
    dispatch(getSubTotal());
  };

  const totalItems = sum(cart.map((item) => item.quantity));

  return (
    <FormProvider>
      <form autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Carrito
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} productos)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <Scrollbar>
                  <CheckoutProductList
                    products={cart}
                    onDelete={handleDeleteCart}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title="El carrito esta vacio"
                  description="Parece que no tiene artículos en su cesta de la compra."
                  img="/static/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary total={total} subtotal={subtotal} />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={cart.length === 0}
              onClick={handleNextStep}
            >
              Siguiente
            </Button>
          </Grid>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<Icon icon={arrowIosBackFill} />}
            sx={{ px: 3 }}
          >
            Continuar comprando
          </Button>
        </Grid>
      </form>
    </FormProvider>
  );
}
