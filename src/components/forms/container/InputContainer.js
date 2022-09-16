import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputMemo from '../Input';

const Input = ({ name, label, ...others }) => {
  const methods = useFormContext();
  return <InputMemo name={name} label={label} methods={methods} {...others} />;
};

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  others: PropTypes.node
};
