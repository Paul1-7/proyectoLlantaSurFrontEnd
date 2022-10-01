import React, { memo } from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const DropzoneMemo = memo(
  ({ name, label, methods, ...others }) => (
    <Grid item xs={12} md={6}>
      <Controller name={name} control={methods.control} render={({ field }) => <a>s</a>} />
    </Grid>
  ),
  (prevProps, nextProps) =>
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors
);

export default DropzoneMemo;

DropzoneMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  others: PropTypes.node,
  methods: PropTypes.object
};
