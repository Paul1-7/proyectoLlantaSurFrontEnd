import React, { memo } from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const InputMemo = memo(
  ({ name, label, methods, ...others }) => (
    <Grid item xs={12} md={6}>
      <TextField
        variant="outlined"
        label={label}
        error={!!methods.formState.errors[name]}
        helperText={methods.formState.errors[name]?.message ?? ''}
        fullWidth
        size="small"
        {...others}
        {...methods.register(name)}
      />
    </Grid>
  ),
  (prevProps, nextProps) =>
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors
);

export default InputMemo;

InputMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  others: PropTypes.node,
  methods: PropTypes.object
};
