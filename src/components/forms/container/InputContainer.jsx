import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputMemo from '../Input';

function Input({ name, label, isArray, helperText, variant, ...others }) {
  const methods = useFormContext();
  return (
    <InputMemo
      name={name}
      isArray={isArray}
      label={label}
      methods={methods}
      {...others}
      variant={variant}
      helperText={helperText}
    />
  );
}

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  others: PropTypes.node,
  isArray: PropTypes.bool,
};
