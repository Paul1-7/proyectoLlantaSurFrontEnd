import { TableCell } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { getBOBCurrency } from '~/utils/dataHandler';

function Currency({ value, align }) {
  return <TableCell align={align}>{getBOBCurrency(value)}</TableCell>;
}

export default Currency;

Currency.propTypes = {
  value: PropTypes.number,
  align: PropTypes.string,
};
