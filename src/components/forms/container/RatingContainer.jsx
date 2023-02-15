import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import RatingMemo from '../RatingMemo';

function Rating({ name, label, isArray, helperText, ...others }) {
  const methods = useFormContext();
  return (
    <RatingMemo name={name} isArray={isArray} label={label} methods={methods} helperText={helperText} {...others} />
  );
}

export default Rating;

Rating.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  others: PropTypes.node,
  isArray: PropTypes.bool,
};
