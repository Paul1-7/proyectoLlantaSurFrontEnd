import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import DataTablesButtons from 'components/DataTablesButtons';
import Label from 'components/Label';
import { TABLE_STATES } from 'constants/dataTable';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
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
  setOpenDialog,
  collapse = null
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(orderByDefault);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const [open, setOpen] = useState({ state: false, index: null });
  const dataFiltered = filterData(searchQuery, rows);
  // const collapseHeader = rows[0].sucursales ?? {};
  // console.log('TCL: collapseHeader', collapseHeader);

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
                    {columns.map(({ field }, index) => {
                      const value = row[field];
                      if (field === 'estado') {
                        return (
                          <TableCell key={index} align={align}>
                            <Label color={states[value].variant}>{states[value].name}</Label>
                          </TableCell>
                        );
                      }
                      if (field === 'fecha') {
                        return (
                          <TableCell key={index} align={align}>
                            {new Date(value).toLocaleDateString()}
                          </TableCell>
                        );
                      }
                      if (field === 'metodoPago') {
                        const label = TABLE_STATES.paymentMethods[value];
                        return (
                          <TableCell key={index} align={align}>
                            <Label color={label.variant}>{label.name}</Label>
                          </TableCell>
                        );
                      }
                      if (field === 'tipoVenta') {
                        const label = TABLE_STATES.salesTypes[value];
                        return (
                          <TableCell key={index} align={align}>
                            <Label color={label.variant}>{label.name}</Label>
                          </TableCell>
                        );
                      }
                      if (Array.isArray(value)) {
                        return (
                          <TableCell key={index} align={align}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              {value.map((item, index) => (
                                <div key={index}>
                                  <Label color="info">{item}</Label>
                                </div>
                              ))}
                            </div>
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
                      <TableCell align={align}>
                        <DataTablesButtons
                          id={row.id}
                          buttons={btnActions}
                          handleDelete={handleDelete}
                          setOpenDialog={setOpenDialog}
                        />
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
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  numeration: PropTypes.bool,
  btnActions: PropTypes.object,
  orderByDefault: PropTypes.string,
  align: PropTypes.string,
  states: PropTypes.array,
  handleDelete: PropTypes.func,
  setOpenDialog: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  collapse: PropTypes.string
};
