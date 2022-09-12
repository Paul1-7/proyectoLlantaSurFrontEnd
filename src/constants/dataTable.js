const COLUMNS = {
  clientes: ['nombre', 'apellido', 'CI/Nit', 'estado', 'celular']
};

const TABLE_STATES = {
  active: [
    { name: 'Deshabilitado', variant: 'error' },
    { name: 'Habilitado', variant: 'success' }
  ]
};

const COLUMN_FORMAT = {
  id: '',
  numeric: false,
  disablePadding: false,
  sorting: true,
  label: ''
};

export { COLUMNS, COLUMN_FORMAT, TABLE_STATES };
