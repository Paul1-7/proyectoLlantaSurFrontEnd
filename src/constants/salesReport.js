import { add } from 'date-fns';

const dateEnd = new Date();

export const SALES_REPORT_FREQUENCY_OPTIONS = [
  {
    id: '1',
    name: 'Diaria',
    dateStart: add(new Date(), { days: -1 }),
    dateEnd,
  },
  {
    id: '2',
    name: 'Semanal',
    dateStart: add(new Date(), { days: -7 }),
    dateEnd,
  },
  {
    id: '3',
    name: 'Mensual',
    dateStart: add(new Date(), { days: -30 }),
    dateEnd,
  },
  {
    id: '4',
    name: 'Anual',
    dateStart: add(new Date(), { days: -365 }),
    dateEnd,
  },
  {
    id: '5',
    name: 'Rango de fechas',
  },
];

export const SALES_REPORT_SORT_OPTIONS = [
  { id: '1', name: 'Tipo de venta' },
  { id: '2', name: 'Fecha' },
  { id: '3', name: 'Vendedor' },
  { id: '4', name: 'Total' },
];

export const ITEM_TO_ALL_REPORT_SUBSIDIARIES = [
  {
    id: 'all',
    name: 'Todas las sucursales',
  },
];

export const COLUMN_SALES_REPORT_PDF = [
  'N°',
  'Código de venta',
  'Fecha',
  'Tipo de venta',
  'CI/NIT cliente',
  'Vendedor',
  'Sucursal',
  'Total',
];

export const COLUMNS_CSV_SALES_REPORT = [
  { displayName: 'Código de venta', id: 'codVenta' },
  { displayName: 'Fecha', id: 'fecha' },
  { displayName: 'Tipo de venta', id: 'tipoVenta' },
  { displayName: 'CI/NIT cliente', id: 'cliente' },
  { displayName: 'Vendedor', id: 'vendedor' },
  { displayName: 'Sucursal', id: 'sucursal' },
  { displayName: 'Total', id: 'total' },
];
