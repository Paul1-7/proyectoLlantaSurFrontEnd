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

export { objectByString, getBOBCurrency, formatDateToLocal, DEFAULT_CONFIG_NOTISTACK };
