import { TableCell } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';

function CellIsDiscount({ value, align }) {
  return (
    <TableCell align={align}>
      <Label color="info">{value?.length ? 'si' : 'no'}</Label>
    </TableCell>
  );
}

export default CellIsDiscount;

CellIsDiscount.propTypes = {
  value: PropTypes.any,
  align: PropTypes.string,
};
