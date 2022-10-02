const COLUMNS = {
  customers: [
    { field: 'nombre', header: 'nombre' },
    { field: 'apellido', header: 'apellido' },
    { field: 'CI/Nit', header: 'CI/Nit' },
    { field: 'celular', header: 'celular' },
    { field: 'estado', header: 'estado' }
  ],
  employees: [
    { field: 'nombre', header: 'nombre' },
    { field: 'apellido', header: 'apellido' },
    { field: 'CI/Nit', header: 'CI/Nit' },
    { field: 'celular', header: 'celular' },
    { field: 'estado', header: 'estado' },
    { field: 'roles', header: 'roles' }
  ],
  categories: [
    { field: 'nombre', header: 'nombre' },
    { field: 'descripcion', header: 'descripción' },
    { field: 'estado', header: 'estado' }
  ],
  brands: [
    { field: 'nombre', header: 'nombre' },
    { field: 'estado', header: 'estado' }
  ],
  products: [
    { field: 'nombre', header: 'nombre' },
    { field: 'precioVenta', header: 'precio' },
    { field: 'fecha', header: 'fecha' },
    { field: 'marca', header: 'marca' },
    { field: 'categoria', header: 'categoría' },
    { field: 'stock', header: 'stock' },
    { field: 'estado', header: 'estado' }
  ],
  providers: [
    { field: 'nombre', header: 'nombre' },
    { field: 'tel', header: 'teléfono' },
    { field: 'nombreEnc', header: 'nombre del encargado' },
    { field: 'apEnc', header: 'apellido del encargado' },
    { field: 'estado', header: 'estado' }
  ]
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
