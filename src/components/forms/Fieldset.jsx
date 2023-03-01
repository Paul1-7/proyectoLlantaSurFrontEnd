import { Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { grey } from '@mui/material/colors';

const styleByDefault = { border: `1px solid ${grey['700']}`, padding: '24px', borderRadius: '10px' };

function Fieldset({ title, children, style, ...other }) {
  return (
    <fieldset style={{ ...styleByDefault, ...style }} {...other}>
      <Typography variant="subtitle1" align="center" component="legend" sx={{ padding: '0 16px' }}>
        {title}
      </Typography>
      {children}
    </fieldset>
  );
}
export default Fieldset;

Fieldset.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};
