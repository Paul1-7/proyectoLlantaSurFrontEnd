import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { objectByString } from '~/utils/dataHandler';

const RadioGroupMemo = memo(
  ({ name, label, isArray, methods, items, ...others }) => {
    const error = methods.formState.errors;

    const errorValue = isArray ? objectByString(error, name) : error[name];
    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl>
            <FormLabel id={name}>{label}</FormLabel>
            <MuiRadioGroup
              aria-labelledby={name}
              {...field}
              onChange={(event, value) => field.onChange(value)}
              value={field.value}
              {...others}
            >
              {items.map((item) => (
                <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
              ))}
            </MuiRadioGroup>
            <FormHelperText error={!!errorValue} color="error">
              {errorValue?.message}
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
RadioGroupMemo.displayName = 'RadioGroupMemo';
export default RadioGroupMemo;

RadioGroupMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
