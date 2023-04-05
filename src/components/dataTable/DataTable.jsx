import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import DataTablesButtons from '~/components/DataTablesButtons';

import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import SearchBar from '../SearchBar';
import DataTableCell from './DataTableCell';
import DataTableHead from './DataTableHead';
import FilterProductsTable from '../products/FilterProductsTable';

const getDataFiltered = (query, data) => {
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

function DataTable({
  rows,
  columns,
  numeration = false,
  btnActions = null,
  orderByDefault = '',
  align = 'center',
  error,
  loading,
  filtersProducts = null,
  collapse = null,
  width = null,
  orderDesc = false,
  ...others
}) {
  const [order, setOrder] = useState(orderDesc ? 'desc' : 'asc');
  const [orderBy, setOrderBy] = useState(orderByDefault);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterData, setFilterData] = useState([]);

  const [open, setOpen] = useState({ state: false, index: null });
  const dataFiltered = getDataFiltered(searchQuery, filterData);

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
  const emptyRows = page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - dataFiltered.length) : 0;

  const arrayEmpty = [];

  const message = 'No hay datos';

  for (let i = 0; i < emptyRows; i += 1) {
    arrayEmpty.push(i);
  }

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="space-between">
        <SearchBar setSearchQuery={setSearchQuery} sx={{ marginBottom: '16px' }} />
        {filtersProducts && <FilterProductsTable rows={rows} setFilterData={setFilterData} />}
      </Stack>
      <TableContainer sx={{ minHeight: '25rem' }}>
        <Table sx={{ minWidth: width || 750, height: '25rem' }} aria-labelledby="tableTitle" {...others}>
          <DataTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            columns={columns}
            numeration={numeration}
            btnActions={btnActions}
            collapse={collapse}
          />
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length + 2} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 2} align="center">
                  {message}
                </TableCell>
              </TableRow>
            )}
            {!loading && rows.length === 0 && error && (
              <TableRow>
                <TableCell colSpan={columns.length + 2} align="center">
                  {error?.message}
                </TableCell>
              </TableRow>
            )}
            {stableSort(dataFiltered, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Fragment key={index}>
                  <TableRow hover sx={{ height: 55, '& > *': { borderBottom: 'unset' } }}>
                    {collapse && (
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen({ state: !open.state, index })}
                        >
                          {open.state ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                      </TableCell>
                    )}
                    {numeration && <TableCell align={align}>{page * rowsPerPage + index + 1}</TableCell>}
                    {columns.map(({ field, type }, index) => {
                      const value = row[field];

                      if (type === 'states') {
                        return <DataTableCell.States key={index} align={align} value={value} />;
                      }
                      if (type === 'date') {
                        return <DataTableCell.Date key={index} align={align} value={value} />;
                      }
                      if (type === 'paymentsMethods') {
                        return <DataTableCell.PaymentsMethods key={index} align={align} value={value} />;
                      }
                      if (type === 'salesTypes') {
                        return <DataTableCell.SalesTypes key={index} align={align} value={value} />;
                      }
                      if (type === 'currency') {
                        return <DataTableCell.Currency key={index} align={align} value={value} />;
                      }
                      if (type === 'array') {
                        return <DataTableCell.ValuesArray key={index} align={align} value={value} />;
                      }
                      if (type === 'isDiscount') {
                        return <DataTableCell.CellIsDiscount key={index} align={align} value={value} />;
                      }
                      if (type === 'stock') {
                        return <DataTableCell.Stock key={index} align={align} value={value} minStock={row.stockMin} />;
                      }
                      return <DataTableCell.Default key={index} align={align} value={value} />;
                    })}

                    {btnActions && (
                      <TableCell align={align}>
                        <DataTablesButtons data={row} index={index} buttons={btnActions} />
                      </TableCell>
                    )}
                  </TableRow>
                  {collapse && (
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 3}>
                        <Collapse in={open.state && open.index === index} timeout="auto">
                          <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label={collapse + index}>
                              <TableHead>
                                <TableRow>
                                  {Object.keys(row?.[collapse]?.[0] ?? {}).map((header, index) => (
                                    <TableCell key={index}>{header}</TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row[collapse].map((item, index) => (
                                  <TableRow key={index}>
                                    {Object.values(item).map((header, index) => (
                                      <TableCell key={index} component="th" scope="row">
                                        {header}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            {emptyRows > 0 &&
              !loading &&
              !error &&
              rows.length !== 0 &&
              arrayEmpty.map((item) => (
                <TableRow key={item} sx={{ height: 55 }}>
                  <TableCell colSpan={6} sx={{ border: 'none' }} />
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
        labelRowsPerPage="Filas por página"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default DataTable;

DataTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  numeration: PropTypes.bool,
  btnActions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  orderByDefault: PropTypes.string,
  align: PropTypes.string,
  handleDelete: PropTypes.func,
  setOpenDialog: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  collapse: PropTypes.string,
  width: PropTypes.string,
  minStock: PropTypes.number,
  orderDesc: PropTypes.bool,
  filtersProducts: PropTypes.bool,
};
