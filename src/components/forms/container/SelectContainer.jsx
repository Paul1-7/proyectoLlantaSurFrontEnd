import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import SelectMemo from '../Select';

function Select({ name, isArray, label, items, ...others }) {
  const methods = useFormContext();
  return <SelectMemo name={name} label={label} isArray={isArray} methods={methods} {...others} items={items} />;
}

export default Select;

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
