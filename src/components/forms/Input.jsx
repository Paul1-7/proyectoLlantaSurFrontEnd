import React, { memo } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { objectByString } from '~/utils/dataHandler';

const InputMemo = memo(
  ({ name, label, isArray, helperText, methods, variant = null, ...others }) => {
    const error = methods.formState.errors;

    const errorValue = isArray ? objectByString(error, name) : error[name];
    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <TextField
            variant={variant ?? 'outlined'}
            label={label}
            value={field.value}
            onChange={field.onChange}
            error={!!errorValue}
            helperText={errorValue?.message ?? helperText ?? ' '}
            fullWidth
            size="small"
            {...others}
            {...field}
          />
        )}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors &&
    prevProps.methods.formState.submitCount === nextProps.methods.formState.submitCount,
);
InputMemo.displayName = 'InputMemo';
export default InputMemo;

InputMemo.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string.isRequired,
  others: PropTypes.node,
  methods: PropTypes.object,
  isArray: PropTypes.bool,
};
