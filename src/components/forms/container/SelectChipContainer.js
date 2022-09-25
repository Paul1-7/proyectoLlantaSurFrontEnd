import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import SelectChipMemo from '../SelectChip';

const SelectChip = ({ name, label, items, ...others }) => {
  const methods = useFormContext();
  return <SelectChipMemo name={name} label={label} methods={methods} {...others} items={items} />;
};

export default SelectChip;

SelectChip.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  others: PropTypes.object
};
