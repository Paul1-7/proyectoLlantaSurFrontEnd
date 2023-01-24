import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';

import { objectByString } from '~/utils/dataHandler';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { DEFAULT_VALUE_ITEM } from '~/constants/items';

const SelectMemo = memo(
  ({ name, label, isArray, methods, items, ...others }) => {
    const error = methods.formState.errors;
    const errorValue = isArray ? objectByString(error, name) : error[name];

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl fullWidth size="small">
            <InputLabel id={name}>{label}</InputLabel>
            <Select
              labelId={name}
              {...field}
              label={label}
              onChange={(value) => field.onChange(value)}
              value={field.value}
              {...others}
            >
              <MenuItem value={DEFAULT_VALUE_ITEM}>Ninguno</MenuItem>
              {items.map((item, index) => {
                const value = Object.values(item);
                return (
                  <MenuItem key={index} value={value?.[0]}>
                    {value?.[1]}
                  </MenuItem>
                );
              })}
            </Select>
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
SelectMemo.displayName = 'SelectMemo';
export default SelectMemo;

SelectMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
