import { TableCell, useTheme } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Stock({ value, align, minStock }) {
  const theme = useTheme();
  const ERROR = theme.palette.error.main;
  const SUCCESS = theme.palette.success.main;

  return (
    <TableCell align={align} sx={{ color: minStock < Number(value) ? SUCCESS : ERROR, borderBottom: 0 }}>
      {value}
    </TableCell>
  );
}

export default Stock;

Stock.propTypes = {
  value: PropTypes.any.isRequired,
  minStock: PropTypes.number,
  align: PropTypes.string,
};
