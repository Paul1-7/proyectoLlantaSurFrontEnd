import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import PropTypes from 'prop-types';

const style = { border: `1px solid ${grey['700']}`, padding: '24px', borderRadius: '10px' };

const Fieldset = ({ title, children, ...other }) => (
  <fieldset style={{ ...style, ...other }}>
    <Typography variant="subtitle1" align="center" component="legend" sx={{ padding: '0 16px' }}>
      {title}
    </Typography>
    {children}
  </fieldset>
);

export default Fieldset;

Fieldset.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  other: PropTypes.object
};
