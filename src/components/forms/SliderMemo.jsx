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
            <FormLabel id={name} sx={{ mb: 4 }}>
              {label}
            </FormLabel>
            <Slider
              value={field.value}
              onChange={field.onChange}
              valueLabelDisplay="auto"
              getAriaValueText={() => `${name} ${field.value}`}
              {...others}
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
  items: PropTypes.arrayOf(PropTypes.object),
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
