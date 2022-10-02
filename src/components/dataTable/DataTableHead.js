import PropTypes from 'prop-types';

import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';

const COLUMN_FORMAT = {
  id: '',
  align: 'center',
  disablePadding: false,
  sorting: true,
  label: ''
};

const createDataTableColumns = (columns) =>
  columns.map(({ header }) => ({ ...COLUMN_FORMAT, id: header, label: header.toUpperCase() }));

function DataTableHead({ order, orderBy, onRequestSort, columns, numeration, btnActions }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const columnHead = createDataTableColumns(columns);

  return (
    <TableHead>
      <TableRow>
        {numeration && (
          <TableCell align={COLUMN_FORMAT.align} padding={COLUMN_FORMAT.disablePadding ? 'none' : 'normal'}>
            NUMERACIÓN
          </TableCell>
        )}
        {columnHead.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sorting ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
        {btnActions && (
          <TableCell align={COLUMN_FORMAT.align} padding={COLUMN_FORMAT.disablePadding ? 'none' : 'normal'}>
            ACCIONES
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export default DataTableHead;

DataTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object),
  numeration: PropTypes.bool,
  btnActions: PropTypes.object
};
