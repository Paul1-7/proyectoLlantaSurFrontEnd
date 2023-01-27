import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';

import { objectByString } from '~/utils/dataHandler';
import { FormControl, FormHelperText, FormLabel, Slider } from '@mui/material';

const SliderMemo = memo(
  ({ name, label, isArray, methods, ...others }) => {
    const error = methods.formState.errors;
    const errorValue = isArray ? objectByString(error, name) : error[name];

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl>
            <FormLabel id={name}>{label}</FormLabel>
            <Slider
              id={name}
              name={name}
              getAriaLabel={() => 'Temperature range'}
              value={field.value}
              onChange={field.handleChange}
              valueLabelDisplay="auto"
              {...others}
              getAriaValueText={field.value}
            />
            <FormHelperText error={!!errorValue} color="error">
              {errorValue?.message ?? ' '}
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
SliderMemo.displayName = 'SelectMemo';
export default SliderMemo;

SliderMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
