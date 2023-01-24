import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';

import { objectByString } from '~/utils/dataHandler';
import { Autocomplete, CircularProgress, FormHelperText, TextField } from '@mui/material';

const AutocompleteMemo = memo(
  ({ name, label, isArray, loading, methods, items, ...others }) => {
    const [inputValue, setInputValue] = useState('');
    const defaultValue = { nombre: 'Ninguno', id: '0' };
    items = [...items, ...[defaultValue]];

    const error = methods.formState.errors;
    const errorValue = isArray ? objectByString(error, name) : error[name];

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <>
            <Autocomplete
              value={field.value}
              size="small"
              autoComplete
              fullWidth
              inputValue={inputValue}
              loading={loading}
              loadingText="Cargando..."
              onChange={(event, newValue) => {
                if (newValue === null) methods.setValue(name, defaultValue, { shouldValidate: true });
                else field.onChange(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={items}
              isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
              getOptionLabel={(option) => option?.nombre ?? ''}
              {...others}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <FormHelperText error={!!errorValue} color="error">
              {errorValue?.message ?? ' '}
            </FormHelperText>
          </>
        )}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
    prevProps.methods.formState.errors !== nextProps.methods.formState.errors &&
    prevProps.methods.formState.submitCount === nextProps.methods.formState.submitCount,
);
AutocompleteMemo.displayName = 'AutocompleteMemo';
export default AutocompleteMemo;

AutocompleteMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
