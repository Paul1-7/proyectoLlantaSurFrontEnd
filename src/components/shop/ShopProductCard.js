import PropTypes from 'prop-types';
import { paramCase } from 'change-case';

// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
// routes
import { PATH_MODULES } from 'routes/paths';
// utils
import { fCurrency } from 'utils/formatNumber';
// components
import Label from 'components/Label';
import Image from 'components/Image';
import { Link } from 'react-router-dom';
// import { ColorPreview } from 'components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { nombre, imagen, precioVenta, precioCompra } = product;
  const status = 'sale';

  const linkTo = `${PATH_MODULES.shop.products}/${paramCase(nombre)}`;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
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
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit">
          <Typography variant="subtitle2" noWrap>
            {nombre}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Stack direction="row" spacing={0.5}>
            {precioCompra && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(precioCompra)}
              </Typography>
            )}

            <Typography variant="subtitle1">{fCurrency(precioVenta)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
