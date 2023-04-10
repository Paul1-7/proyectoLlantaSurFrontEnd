import States from './States';
import DateCell from './Date';
import DateTimeCell from './DateTime';
import PaymentsMethods from './PaymentsMethods';
import SalesTypes from './SalesTypes';
import ValuesArray from './ValuesArray';
import Currency from './Currency';
import Default from './Default';
import Stock from './Stock';
import CellIsDiscount from './CellIsDiscount';

const DataTableCell = {
  States,
  Date: DateCell,
  DateTime: DateTimeCell,
  PaymentsMethods,
  SalesTypes,
  ValuesArray,
  Currency,
  Stock,
  Default,
  CellIsDiscount,
};

export default DataTableCell;
