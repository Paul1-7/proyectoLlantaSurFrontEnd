import { TableCell } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';

const Stock = ({ value, align, minStock }) => {
  const theme = useTheme();
  const ERROR = theme.palette.error.main;
  const SUCCESS = theme.palette.success.main;

  return (
    <TableCell align={align} sx={{ color: minStock < Number(value) ? SUCCESS : ERROR }}>
      {value}
    </TableCell>
  );
};

export default Stock;

Stock.propTypes = {
  value: PropTypes.any.isRequired,
  minStock: PropTypes.number.isRequired,
  align: PropTypes.string
};
