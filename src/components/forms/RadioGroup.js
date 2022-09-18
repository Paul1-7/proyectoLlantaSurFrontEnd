import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  FormHelperText
} from '@material-ui/core';
import { Controller } from 'react-hook-form';

const RadioGroupMemo = memo(
  ({ name, label, methods, items, ...others }) => {
    const error = methods.formState.errors[name];

    return (
      <Grid item xs={12} md={6}>
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
              <FormHelperText error={error} color="error">
                {error?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
    );
  },
  (prevProps, nextProps) =>
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors
);

export default RadioGroupMemo;

RadioGroupMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  methods: PropTypes.object,
  others: PropTypes.object
};
