import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Grid,
  FormHelperText,
  InputLabel,
  Select,
  Box,
  Chip,
  MenuItem,
  OutlinedInput
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { objectByString } from 'utils/dataHandler';

const SelectChipMemo = memo(
  ({ name, label, methods, isArray, items, ...others }) => {
    const error = methods.formState.errors;

    const errorValue = isArray ? objectByString(error, name) : error[name];

    const handleChange = (event, field) => {
      const {
        target: { value }
      } = event;

      field.onChange(value);
    };

    const itemName = (value) => {
      const found = items.find((item) => item.idRol === value);
      return found.nombreRol;
    };

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl sx={{ width: '100%' }} size="small">
            <InputLabel id={name}>{label}</InputLabel>
            <Select
              multiple
              labelId={name}
              {...field}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              onChange={(event) => handleChange(event, field)}
              value={field.value}
              {...others}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={itemName(value)} />
                  ))}
                </Box>
              )}
            >
              {items.map((item) => (
                <MenuItem key={item.idRol} value={item.idRol}>
                  {item.nombreRol}
                </MenuItem>
              ))}
            </Select>
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
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors
);

export default SelectChipMemo;

SelectChipMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool
};
