import { TableCell } from '@mui/material';
import Label from '~/components/Label';
import { TABLE_STATES } from '~/constants/dataTable';
import React from 'react';
import PropTypes from 'prop-types';

function PaymentsMethods({ value, align }) {
  const label = TABLE_STATES.salesTypes[value];
  return (
    <TableCell align={align}>
      <Label color={label.variant}>{label.name}</Label>
    </TableCell>
  );
}

export default PaymentsMethods;

PaymentsMethods.propTypes = {
  value: PropTypes.number,
  align: PropTypes.string,
};
