import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import CheckboxMemo from '../Checkbox';

function Checkbox({ name, isArray, label, items, ...others }) {
  const methods = useFormContext();
  return <CheckboxMemo name={name} label={label} methods={methods} {...others} items={items} isArray={isArray} />;
}

export default Checkbox;

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
