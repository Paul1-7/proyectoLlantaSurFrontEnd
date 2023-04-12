import PropTypes from 'prop-types';

import { Card, Typography, Stack } from '@mui/material';

import { PATH_MODULES } from '~/routes/paths';

import Label from '~/components/Label';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addCart } from '~/redux/slices/productsShop';
import { MIconButton } from '~/components/@material-extend';
import { getBOBCurrency } from '~/utils/dataHandler';

export default function ShopProductCard({ product }) {
  const dispatch = useDispatch();
  const { id, nombre, imagen, precio: descuento = null, precioVenta } = product;
  const status = 'descuento';

  const linkTo = `${PATH_MODULES.shop.products}/${id}`;

  return (
    <Card>
      <Link sx={{ position: 'relative', display: 'block' }} to={linkTo} style={{ textDecoration: 'none' }}>
        {descuento && (
          <Label
            variant="filled"
            color={(status === 'descuento' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
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

        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Stack direction="row" justifyContent="space-evenly" alignItems="center">
            {descuento && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through', pr: 2 }}>
                {getBOBCurrency(descuento)}
              </Typography>
            )}

            <Typography variant="subtitle1">{getBOBCurrency(precioVenta)}</Typography>
          </Stack>
          {/* <Stack direction="row">
            <MIconButton color="success" onClick={() => dispatch(addCart(product))}>
              <AddShoppingCart />
            </MIconButton>
          </Stack> */}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
