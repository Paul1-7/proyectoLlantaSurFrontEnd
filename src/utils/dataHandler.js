import { ROLES } from '~/config';

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

const objectByString = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, '?.$1'); // convert indexes to properties
  s = s.replace(/^\./, ''); // strip a leading dot
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (typeof o === 'undefined') return null;
    if (k in o) {
      o = o[k];
    } else {
      return null;
    }
  }
  return o;
};

const getBOBCurrency = (value) => new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(value);

const DEFAULT_CONFIG_NOTISTACK = {
  anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
  autoHideDuration: 4000,
};

const formatDateToLocal = (date) => new Date(date).toLocaleDateString('bo-ES', optionsDate);

function isCurrentDateInRange(fechaInicio, fechaFin) {
  const currentDate = new Date();
  return currentDate >= new Date(fechaInicio) && currentDate <= new Date(fechaFin);
}

const getDateTimeFormat = (value) => {
  const format = new Intl.DateTimeFormat('es-BO', { dateStyle: 'medium', timeStyle: 'medium' });
  const date = new Date(value);
  return format.format(date);
};

function isDateExpired(date) {
  const currentDate = new Date();
  return currentDate >= new Date(date);
}

function isValidDiscount(value) {
  if (!Array.isArray(value)) {
    const { fechaFin, fechaInicio, estado } = value;
    return isCurrentDateInRange(fechaInicio, fechaFin) && estado === 1;
  }

  return value.every(
    ({ fechaFin, fechaInicio, estado }) => isCurrentDateInRange(fechaInicio, fechaFin) && estado === 1,
  );
}

const productAmount = (product) => {
  const { descuentos = [] } = product || {};
  if (descuentos.length && isValidDiscount(descuentos.at(0))) return product.descuentos.at(0).cantMax;

  const sucursales = product?.sucursales ?? [];
  let totalStock = 0;
  sucursales.forEach(({ Sucursales_Productos: _suc, SucursalesProductos: suc }) => {
    totalStock += suc ? suc.stock : _suc.stock;
  });

  return totalStock;
};

const getNamesRolesFromIds = (ids = []) => {
  const namesRoles = [];
  const rolesEntries = Object.entries(ROLES);

  rolesEntries.forEach(([, valueRol]) => {
    if (ids.includes(valueRol.id)) namesRoles.push(valueRol.name);
  });
  return namesRoles;
};

export {
  objectByString,
  getBOBCurrency,
  formatDateToLocal,
  DEFAULT_CONFIG_NOTISTACK,
  productAmount,
  isCurrentDateInRange,
  isValidDiscount,
  getNamesRolesFromIds,
  isDateExpired,
  getDateTimeFormat,
};
