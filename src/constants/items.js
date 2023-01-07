const DEFAULT_VALUE_ITEM = '0';

const ITEMS_RADIO_GROUP = [
  {
    id: '1',
    title: 'Habilitado'
  },
  {
    id: '0',
    title: 'Deshabilitado'
  }
];

const ITEMS_SELECTS = [
  {
    idRol: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
    nombreRol: 'Administrador'
  },
  {
    idRol: '678197a0-69a8-4c24-89a5-bf13873cc08b',
    nombreRol: 'Empleado de ventas'
  }
];

const ITEM_INVENTORY_REPORT_CRITERIA = [
  {
    id: '1',
    name: 'mas vendidos'
  },
  {
    id: '2',
    name: 'por orden alfabético'
  },
  {
    id: '3',
    name: 'por cantidad de stock'
  },
  {
    id: '4',
    name: 'por categoría'
  },
  {
    id: '5',
    name: 'por proveedores'
  }
];

const ITEM_INVENTORY_REPORT_SUBSIDIARIES = [
  {
    id: '1',
    name: 'todas las sucursales'
  }
];

export {
  ITEMS_RADIO_GROUP,
  ITEMS_SELECTS,
  ITEM_INVENTORY_REPORT_CRITERIA,
  ITEM_INVENTORY_REPORT_SUBSIDIARIES,
  DEFAULT_VALUE_ITEM
};
