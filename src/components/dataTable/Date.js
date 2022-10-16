import { TableCell } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const DateCell = ({ value, align }) => <TableCell align={align}>{new Date(value).toLocaleDateString()}</TableCell>;

export default DateCell;

DateCell.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string
};
