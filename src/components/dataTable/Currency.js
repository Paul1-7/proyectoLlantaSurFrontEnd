import { TableCell } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { getBOBCurrency } from 'utils/dataHandler';

const Currency = ({ value, align }) => <TableCell align={align}>{getBOBCurrency(value)}</TableCell>;

export default Currency;

Currency.propTypes = {
  value: PropTypes.number,
  align: PropTypes.string
};
