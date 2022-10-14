import { TableCell } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const States = ({ value, align }) => <TableCell align={align}>{new Date(value).toLocaleDateString()}</TableCell>;

export default States;

States.propTypes = {
  value: PropTypes.number,
  align: PropTypes.string
};
