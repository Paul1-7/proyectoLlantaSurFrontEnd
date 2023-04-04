const COLUMNS = {
  customers: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'apellido', header: 'apellido', type: '' },
    { field: 'CI/Nit', header: 'CI/Nit', type: '' },
    { field: 'celular', header: 'celular', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  employees: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'apellido', header: 'apellido', type: '' },
    { field: 'CI/Nit', header: 'CI/Nit', type: '' },
    { field: 'celular', header: 'celular', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
    { field: 'roles', header: 'roles', type: 'array' },
  ],
  categories: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'descripcion', header: 'descripción', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  brands: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  products: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'precioVenta', header: 'precio', type: 'currency' },
    { field: 'fecha', header: 'fecha', type: 'date' },
    { field: 'marca', header: 'marca', type: '' },
    { field: 'categoria', header: 'categoría', type: '' },
    { field: 'stock', header: 'stock', type: 'stock' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  providers: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'tel', header: 'teléfono', type: '' },
    { field: 'nombreEnc', header: 'nombre del encargado', type: '' },
    { field: 'apEnc', header: 'apellido del encargado', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  subsidiaries: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'direccion', header: 'dirección', type: '' },
    { field: 'tel', header: 'teléfono', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  purchases: [
    { field: 'codCompra', header: 'código de compra', type: '' },
    { field: 'fecha', header: 'fecha', type: 'date' },
    { field: 'total', header: 'total', type: 'currency' },
    { field: 'usuario', header: 'usuario', type: '' },
    { field: 'proveedor', header: 'proveedor', type: '' },
  ],
  sells: [
    { field: 'codReferencia', header: 'código de referencia', type: '' },
    { field: 'codVenta', header: 'código de venta', type: '' },
    { field: 'fecha', header: 'fecha', type: 'date' },
    { field: 'cliente', header: 'cliente', type: '' },
    { field: 'vendedor', header: 'vendedor', type: '' },
    { field: 'total', header: 'total', type: 'currency' },
  ],
  productsToSell: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'cantidad', header: 'cantidad', type: 'stock' },
    { field: 'precio', header: 'precio uni.', type: 'currency' },
  ],
  productsToPurchase: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'precioVenta', header: 'precio de venta.', type: 'currency' },
    { field: 'precioCompra', header: 'precio de compra', type: 'currency' },
  ],
  productsToSlider: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'descuentos', header: '¿Tiene descuento?', type: 'isDiscount' },
  ],
  productsDiscounts: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'precioVenta', header: 'precio uni.', type: 'currency' },
  ],
  defectiveProductsToSell: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'stock', header: 'stock', type: '' },
  ],
  discounts: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'fechaInicio', header: 'fecha de inicio', type: 'date' },
    { field: 'fechaFin', header: 'fecha de finalización', type: 'date' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  defectivesProducts: [
    { field: 'producto', header: 'producto', type: '' },
    { field: 'fecha', header: 'fecha', type: 'date' },
    { field: 'codVenta', header: 'código de venta', type: '' },
    { field: 'sucursal', header: 'sucursal', type: '' },
    { field: 'cantidad', header: 'cantidad', type: '' },
    { field: 'descripcion', header: 'descripcion', type: '' },
  ],
};

const TABLE_STATES = {
  active: [
    { name: 'Deshabilitado', variant: 'error' },
    { name: 'Habilitado', variant: 'success' },
  ],
  salesTypes: [
    { name: 'Directa', variant: 'info' },
    { name: 'Electrónica', variant: 'info' },
  ],
  paymentMethods: [
    { name: 'En efectivo', variant: 'info' },
    { name: 'Paypal', variant: 'info' },
    { name: 'Stripe', variant: 'info' },
  ],
};

const COLUMN_FORMAT = {
  id: '',
  numeric: false,
  disablePadding: false,
  sorting: true,
  label: '',
};

export { COLUMNS, COLUMN_FORMAT, TABLE_STATES };
