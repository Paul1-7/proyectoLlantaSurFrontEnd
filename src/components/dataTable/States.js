import { TableCell } from '@material-ui/core';
import Label from 'components/Label';
import { TABLE_STATES } from 'constants/dataTable';
import React from 'react';
import PropTypes from 'prop-types';

const States = ({ value, align }) => {
  const states = TABLE_STATES.active;
  return (
    <TableCell align={align}>
      <Label color={states[value].variant}>{states[value].name}</Label>
    </TableCell>
  );
};

export default States;

States.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string
};
