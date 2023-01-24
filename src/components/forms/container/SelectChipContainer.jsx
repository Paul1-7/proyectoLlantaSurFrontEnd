import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import SelectChipMemo from '../SelectChip';

function SelectChip({ name, label, isArray, items, ...others }) {
  const methods = useFormContext();
  return <SelectChipMemo name={name} label={label} methods={methods} {...others} items={items} isArray={isArray} />;
}

export default SelectChip;

SelectChip.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
