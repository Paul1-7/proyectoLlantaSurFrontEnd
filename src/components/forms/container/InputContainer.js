import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputMemo from '../Input';

const Input = ({ name, label, isArray, ...others }) => {
  const methods = useFormContext();
  return <InputMemo name={name} isArray={isArray} label={label} methods={methods} {...others} />;
};

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  others: PropTypes.node,
  isArray: PropTypes.bool
};
