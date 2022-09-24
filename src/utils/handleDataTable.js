import DataTablesButtons from '../components/DataTablesButtons';
import Label from '../components/Label';

/**
 * It takes an array of strings, an array of objects, a function, an object and another function and
 * returns an array of objects
 * @param columns - An array of strings that represent the columns of the table.
 * @param buttonsValues - An array of objects that contains the buttons that will be rendered in the
 * table.
 * @param setIsOpen - This is a function that sets the state of the modal.
 * @param state - The state of the component that contains the table.
 * @param handleDelete - This is the function that will be called when the delete button is clicked.
 * @returns const createDataTableColumns = (columns, buttonsValues, setIsOpen, state, handleDelete) =>
 * {
 *   const newColumns = columns.map((column) => {
 *     const data = {
 *       field: column,
 *       headerName: column.charAt(0).toUpperCase() + column.slice(1),
 */
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
