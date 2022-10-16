import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { objectByString } from 'utils/dataHandler';
import { es } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormHelperText, TextField } from '@material-ui/core';

const convertValueToEvent = (name, value) => ({
  target: {
    name,
    value
  }
});

const DatePickerMemo = memo(
  ({ name, isArray, label, methods, ...others }) => {
    const error = methods.formState.errors;

    const errorValue = isArray ? objectByString(error, name) : error[name];

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <>
            <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
              <DatePicker
                label={label}
                {...field}
                {...others}
                fullWidth
                onChange={(value) => field.onChange(convertValueToEvent('fechaInicio', value))}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </LocalizationProvider>
            <FormHelperText error={errorValue} color="error">
              {errorValue?.message ?? ' '}
            </FormHelperText>
          </>
        )}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors
);

export default DatePickerMemo;

DatePickerMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool
};
