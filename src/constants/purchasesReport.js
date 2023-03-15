import { add } from 'date-fns';

const dateEnd = new Date();

export const PURCHASES_REPORT_FREQUENCY_OPTIONS = [
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
    id: '6',
    name: 'Trimestral',
    dateStart: add(new Date(), { days: -90 }),
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

export const PURCHASES_REPORT_SORT_OPTIONS = [
  { id: '2', name: 'Fecha' },
  { id: '3', name: 'Proveedor' },
  { id: '4', name: 'Total' },
];

export const COLUMN_PURCHASES_REPORT_PDF = ['N°', 'Código de compra', 'Fecha', 'Usuario', 'Proveedor', 'Total'];

export const COLUMNS_CSV_PURCHASES_REPORT = [
  { displayName: 'Código de compra', id: 'codCompra' },
  { displayName: 'Fecha', id: 'fecha' },
  { displayName: 'Usuario', id: 'usuario' },
  { displayName: 'Proveedor', id: 'proveedor' },
  { displayName: 'Total', id: 'total' },
];
