import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from './SearchBar';

const filterData = (query, data) => {
  if (!query) {
    return data;
  }
  return data.filter((item) => Object.values(item).toString().toLowerCase().includes(query));
};

const DataTable = ({ data, loading, error, columns }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dataFiltered = filterData(searchQuery, data);

  return (
    <Box sx={{ minWidth: '720px' }}>
      <SearchBar setSearchQuery={setSearchQuery} />
      <DataGrid
        rows={dataFiltered}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}
        {...error}
        autoHeight
        disableColumnFilter
        disableColumnMenu
      />
    </Box>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  columns: PropTypes.array.isRequired
};

export default DataTable;
