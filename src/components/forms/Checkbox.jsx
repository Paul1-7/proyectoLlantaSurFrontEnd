import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormControlLabel, FormHelperText, FormGroup, Checkbox } from '@mui/material';
import { Controller } from 'react-hook-form';
import { objectByString } from '~/utils/dataHandler';

const CheckboxMemo = memo(
  ({ name, label, isArray, methods, items = [], others }) => {
    const error = methods.formState.errors;
    const errorValue = isArray ? objectByString(error, name) : error[name];

    function handleSelect(idChecked, values = []) {
      const newNames = values?.includes(idChecked) ? values?.filter((id) => id !== idChecked) : [...values, idChecked];
      return newNames;
    }

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl {...others}>
            <FormLabel id={name}>{label}</FormLabel>
            <FormGroup>
              {items.map((item, index) => {
                const value = Object.values(item);
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={field.value.includes(value[0])}
                        onChange={() => field.onChange(handleSelect(value[0], field.value))}
                        size="small"
                      />
                    }
                    label={value[1]}
                  />
                );
              })}
            </FormGroup>

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
CheckboxMemo.displayName = 'RadioGroupMemo';
export default CheckboxMemo;

CheckboxMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
