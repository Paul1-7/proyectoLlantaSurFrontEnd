import PropTypes from 'prop-types';

// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
// routes
import { PATH_MODULES } from 'routes/paths';
// utils
// components
import Label from 'components/Label';
import Image from 'components/Image';
import { Link } from 'react-router-dom';
import { AddShoppingCart, Favorite } from '@material-ui/icons';
import { getBOBCurrency } from 'utils/dataHandler';
import { useDispatch } from 'react-redux';
import { addCart } from 'redux/slices/productsShop';
import { MIconButton } from 'components/@material-extend';
// import { ColorPreview } from 'components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const dispatch = useDispatch();
  const { id, nombre, imagen, descuento = null, precioVenta } = product;
  const status = 'sale';

  const linkTo = `${PATH_MODULES.shop.products}/${id}`;

  return (
    <Card>
      <Link sx={{ position: 'relative', display: 'block' }} to={linkTo} style={{ textDecoration: 'none' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <Image alt={nombre} src={imagen} ratio="1/1" />
      </Link>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} style={{ textDecoration: 'none' }}>
          <Typography variant="subtitle2" noWrap sx={{ color: 'text.primary' }}>
            {nombre}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" justifyContent="space-evenly" alignItems="center">
            {descuento && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {getBOBCurrency(descuento)}
              </Typography>
            )}

            <Typography variant="subtitle1">{getBOBCurrency(precioVenta)}</Typography>
          </Stack>
          <Stack direction="row">
            <MIconButton color="error" onClick={() => dispatch(addCart(product))}>
              <Favorite />
            </MIconButton>
            <MIconButton color="success" onClick={() => dispatch(addCart(product))}>
              <AddShoppingCart />
            </MIconButton>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
