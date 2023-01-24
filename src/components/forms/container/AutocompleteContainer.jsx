import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import AutocompleteMemo from '../Autocomplete';

function Autocomplete({ name, loading, label, isArray, items, ...others }) {
  const methods = useFormContext();
  return (
    <AutocompleteMemo
      name={name}
      label={label}
      methods={methods}
      {...others}
      items={items}
      isArray={isArray}
      loading={loading}
    />
  );
}

export default Autocomplete;

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  others: PropTypes.object,
  isArray: PropTypes.bool,
  loading: PropTypes.bool,
};
