import { Box, Grid, Step, StepConnector, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import { ShopContainerListProducts } from '~/components/shop';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutBillingAddress, CheckoutCart, CheckoutOrderComplete, CheckoutPayment } from '~/components/checkout';
import { withStyles } from '@mui/styles';

const STEPS = ['Cart', 'Billing & address', 'Payment'];

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  active: {
    '& $line': { borderColor: theme.palette.primary.main },
  },
  completed: {
    '& $line': { borderColor: theme.palette.primary.main },
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
}))(StepConnector);

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'divider',
        bgcolor: 'background.default',
      }}
    >
      {completed ? (
        <Box component={Icon} icon={checkmarkFill} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function ShopCheckout() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.products);
  const { cart, billing, activeStep } = checkout;
  const isComplete = activeStep === STEPS.length;
  return (
    <ShopContainerListProducts title="Checkout">
      <Grid item xs={12} md={8} sx={{ mb: 5 }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={QontoStepIcon}
                sx={{
                  '& .MuiStepLabel-label': {
                    typography: 'subtitle2',
                    color: 'text.disabled',
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      {!isComplete ? (
        <>
          {activeStep === 0 && <CheckoutCart />}
          {activeStep === 1 && <CheckoutBillingAddress />}
          {activeStep === 2 && <CheckoutPayment />}
        </>
      ) : (
        <CheckoutOrderComplete open={isComplete} />
      )}
    </ShopContainerListProducts>
  );
}

export default ShopCheckout;
