import { TableCell } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { getDateTimeFormat } from '~/utils/dataHandler';

function DateTimeCell({ value, align }) {
  return <TableCell align={align}>{getDateTimeFormat(value)}</TableCell>;
}

export default DateTimeCell;

DateTimeCell.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string,
};
