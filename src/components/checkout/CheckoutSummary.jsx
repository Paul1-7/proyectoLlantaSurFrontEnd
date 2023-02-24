import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import { getBOBCurrency } from '~/utils/dataHandler';
import { HelpOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function CheckoutSummary({
  onEdit,
  subtotal,
  shipping = null,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
}) {
  const displayShipping = subtotal >= 200 ? 'Gratuito' : 'Se aplicara una tarifa adicional';

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Resumen de la compra"
        action={
          enableEdit && (
            <Button size="small" type="button" onClick={onEdit} startIcon={<Icon icon={editFill} />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">{getBOBCurrency(subtotal)}</Typography>
          </Stack>
          {/* 
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant="subtitle2">{discount ? getBOBCurrency(-discount) : '-'}</Typography>
          </Stack> */}

          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              Envío
              <Tooltip
                arrow
                componentsProps={{ tooltip: { sx: { fontSize: '13px' } } }}
                leaveDelay={200}
                title={
                  <>
                    Para mas información realice un click en el siguiente enlace&nbsp;
                    <Link style={{ textDecoration: 'none' }} to="/">
                      Políticas de envio
                    </Link>
                  </>
                }
              >
                <HelpOutline sx={{ width: 20, height: 20 }} />
              </Tooltip>
            </Typography>
            <Typography variant="subtitle2">{shipping ? getBOBCurrency(shipping) : displayShipping}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'success.main' }}>
                {getBOBCurrency(subtotal)}
              </Typography>
            </Box>
          </Stack>

          {enableDiscount && (
            <TextField
              fullWidth
              placeholder="Discount codes / Gifts"
              value="DISCOUNT5"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="button" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                      Apply
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

CheckoutSummary.propTypes = {
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
};
