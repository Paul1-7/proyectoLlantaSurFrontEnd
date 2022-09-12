import DataTablesButtons from '../components/DataTablesButtons';
import Label from '../components/Label';

const createDataTableColumns = (columns, buttonsValues, setIsOpen, state, handleDelete) => {
  const newColumns = columns.map((column) => {
    const data = {
      field: column,
      headerName: column.charAt(0).toUpperCase() + column.slice(1),
      flex: 1
    };

    const estado = {
      renderCell: (params) => {
        const { estado } = params.row;
        return <Label color={state[estado].variant}>{state[estado].name}</Label>;
      }
    };

    return column === 'estado' ? { ...data, ...estado } : data;
  });

  newColumns.push({
    field: 'Acciones',
    headerName: 'Acciones',
    sortable: false,
    flex: 1,
    alignItems: 'center',
    renderCell: (params) => {
      const { id } = params.row;
      return <DataTablesButtons id={id} buttons={buttonsValues} setIsOpen={setIsOpen} handleDelete={handleDelete} />;
    }
  });
  return newColumns;
};

export { createDataTableColumns };
