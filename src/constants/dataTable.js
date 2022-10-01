const COLUMNS = {
  customers: ['nombre', 'apellido', 'CI/Nit', 'celular', 'estado'],
  employees: ['nombre', 'apellido', 'CI/Nit', 'celular', 'roles', 'estado'],
  categories: ['nombre', 'descripción', 'estado'],
  brands: ['nombre', 'estado'],
  products: ['nombre', 'estado']
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
