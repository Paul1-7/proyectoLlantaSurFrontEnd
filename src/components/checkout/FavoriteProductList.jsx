import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH_MODULES } from '~/routes/paths';
import { MIconButton } from '../@material-extend';
// utils

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}));

// ----------------------------------------------------------------------

export default function FavoriteProductList({ products = [], onDelete, sx }) {
  return (
    <TableContainer sx={{ minWidth: 720, ...sx }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Producto</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map(({ id, producto, idProd }) => {
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbImgStyle alt="imagen de producto guardado" src={producto.imagen} />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240, mb: 0.5 }}>
                        <Link style={{ textDecoration: 'none' }} to={`${PATH_MODULES.shop.products}/${idProd}`}>
                          {producto.nombre}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <MIconButton onClick={() => onDelete(id)}>
                    <Icon icon={trash2Fill} width={20} height={20} />
                  </MIconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

FavoriteProductList.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func,
  sx: PropTypes.object,
};
