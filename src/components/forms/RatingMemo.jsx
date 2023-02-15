import React, { memo } from 'react';
import { FormControl, FormHelperText, FormLabel, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { objectByString } from '~/utils/dataHandler';

const RatingMemo = memo(
  ({ name, label, isArray, helperText, methods, ...others }) => {
    const error = methods.formState.errors;

    const errorValue = isArray ? objectByString(error, name) : error[name];
    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl>
            <FormLabel id={name} sx={{ fontSize: '14px' }}>
              {' '}
              {label}
            </FormLabel>
            <Rating
              value={field.value}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              size="small"
              {...others}
            />
            <FormHelperText error={!!errorValue} color="error">
              {helperText ?? errorValue?.message ?? ' '}
            </FormHelperText>
          </FormControl>
        )}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors &&
    prevProps.methods.formState.submitCount === nextProps.methods.formState.submitCount,
);
RatingMemo.displayName = 'InputMemo';
export default RatingMemo;

RatingMemo.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string.isRequired,
  others: PropTypes.node,
  methods: PropTypes.object,
  isArray: PropTypes.bool,
};
