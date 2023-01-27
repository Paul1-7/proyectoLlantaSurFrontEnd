import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import SliderMemo from '../SliderMemo';

function Slider({ name, label, isArray, helperText, ...others }) {
  const methods = useFormContext();
  return (
    <SliderMemo name={name} isArray={isArray} label={label} methods={methods} {...others} helperText={helperText} />
  );
}

export default Slider;

Slider.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,

  others: PropTypes.node,
  isArray: PropTypes.bool,
};
