import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import RadioGroupMemo from '../RadioGroup';

function RadioGroup({ name, isArray, label, items, ...others }) {
  const methods = useFormContext();
  return <RadioGroupMemo name={name} label={label} methods={methods} {...others} items={items} isArray={isArray} />;
}

export default RadioGroup;

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
