import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import DatePickerMemo from '../DatePicker';

const DatePicker = ({ name, isArray, label, ...others }) => {
  const methods = useFormContext();
  return <DatePickerMemo name={name} isArray={isArray} label={label} methods={methods} {...others} />;
};

export default DatePicker;

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  others: PropTypes.object,
  isArray: PropTypes.bool
};
