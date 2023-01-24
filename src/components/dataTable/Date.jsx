import { TableCell } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function DateCell({ value, align }) {
  return <TableCell align={align}>{new Date(value).toLocaleDateString()}</TableCell>;
}

export default DateCell;

DateCell.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string,
};
