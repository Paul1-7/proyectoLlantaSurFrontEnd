import DataTablesButtons from '../components/DataTablesButtons';

const createDataTableColumns = (columns, buttonsValues, setIsOpen) => {
  const newColumns = columns.map((column) => ({
    field: column,
    headerName: column.charAt(0).toUpperCase() + column.slice(1),
    flex: 1
  }));

  newColumns.push({
    field: 'Acciones',
    headerName: 'Acciones',
    sortable: false,
    flex: 1,
    alignItems: 'center',
    renderCell: (params) => {
      const { id } = params.row;
      return <DataTablesButtons id={id} buttons={buttonsValues} setIsOpen={setIsOpen} />;
    }
  });
  return newColumns;
};

export { createDataTableColumns };
