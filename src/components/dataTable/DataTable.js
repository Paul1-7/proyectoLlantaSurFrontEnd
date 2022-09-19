import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@material-ui/core';
import DataTablesButtons from 'components/DataTablesButtons';
import Label from 'components/Label';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SearchBar from '../SearchBar';
import DataTableHead from './DataTableHead';

const filterData = (query, data) => {
  if (!query) {
    return data;
  }
  return data.filter((item) => Object.values(item).toString().toLowerCase().includes(query));
};

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const DataTable = ({
  rows,
  columns,
  numeration = false,
  btnActions = null,
  orderByDefault = '',
  align = 'center',
  states = [],
  handleDelete = null,
  error,
  loading,
  setOpenDialog
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(orderByDefault);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const dataFiltered = filterData(searchQuery, rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const arrayEmpty = [];

  const message = 'No hay datos';

  for (let i = 0; i < emptyRows; i += 1) {
    arrayEmpty.push(i);
  }

  return (
    <Box sx={{ marginTop: '16px' }}>
      <SearchBar setSearchQuery={setSearchQuery} sx={{ marginBottom: '16px' }} />
      <TableContainer>
        <Table sx={{ minWidth: 750, height: 350 }} aria-labelledby="tableTitle">
          <DataTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            columns={columns}
            numeration={numeration}
            btnActions={btnActions}
          />
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {message}
                </TableCell>
              </TableRow>
            )}
            {!loading && rows.length === 0 && error && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {error}
                </TableCell>
              </TableRow>
            )}
            {stableSort(dataFiltered, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} hover sx={{ height: 55 }}>
                  {numeration && <TableCell align={align}>{page * rowsPerPage + index + 1}</TableCell>}
                  {columns.map((column, index) => {
                    const value = row[column];
                    if (column.toLowerCase() === 'estado') {
                      return (
                        <TableCell key={index} align={align}>
                          <Label color={states[value].variant}>{states[value].name}</Label>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={index} align={align}>
                        {value}
                      </TableCell>
                    );
                  })}
                  {btnActions && (
                    <TableCell key={index} align={align}>
                      <DataTablesButtons
                        id={row.id}
                        buttons={btnActions}
                        handleDelete={handleDelete}
                        setOpenDialog={setOpenDialog}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {emptyRows > 0 &&
              arrayEmpty.map((item) => (
                <TableRow key={item} sx={{ height: 55 }}>
                  <TableCell colSpan={6} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataFiltered.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DataTable;

DataTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  numeration: PropTypes.bool,
  btnActions: PropTypes.object,
  orderByDefault: PropTypes.string,
  align: PropTypes.string,
  states: PropTypes.array,
  handleDelete: PropTypes.func,
  setOpenDialog: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool
};
