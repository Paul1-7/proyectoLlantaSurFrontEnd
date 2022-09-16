import React from 'react';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Checkbox({ name, label, value, onChange }) {
  const convertToEvent = (name, value) => ({
    target: {
      name,
      value
    }
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => onChange(convertToEvent(name, e.target.checked))}
          />
        }
        label={label}
      />
    </FormControl>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
