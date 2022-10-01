import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import DropzoneMemo from '../DropzoneMemo';

const Dropzone = ({ name, label, ...others }) => {
  const methods = useFormContext();
  return <DropzoneMemo name={name} label={label} methods={methods} {...others} />;
};

export default Dropzone;

Dropzone.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  others: PropTypes.node
};
