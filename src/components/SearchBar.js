import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const SearchBar = ({ setSearchQuery, ...other }) => (
  <TextField
    id="search-bar"
    onInput={(e) => {
      setSearchQuery(String(e.target.value).toLowerCase());
    }}
    autoComplete="off"
    variant="outlined"
    placeholder="Buscar..."
    autoFocus
    size="small"
    {...other}
  />
);

export default SearchBar;

SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired
};
