import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const products = yup.object().shape({
  idProd: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  nombre: yup.string().required(),
  cantidad: yup.number().min(1, 'el valor mínimo es 1').typeError('tiene que ser un número').required(),
  precioCompra: yup.number().required().typeError('El precio de venta debe ser un número'),
  precioVenta: yup
    .number()
    .typeError('El precio de venta debe ser un número')
    .required()
    .when('precioCompra', (precioCompra, value) => {
      if (precioCompra) {
        return value.moreThan(precioCompra, 'El precio de venta debe ser mayor al precio de compra');
      }
      return value;
    }),
});

const subsidiaries = yup.object().shape({
  idSuc: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  nombre: yup.string().required(),
  stock: yup.string().matches(regex.number, msg.number).required(),
});

const subsidiariesProducts = yup.object().shape({
  nombre: yup.string().required(),
  precioVenta: yup.number().required(),
  idProd: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  cantMax: yup.number(),
  sucursales: yup
    .array()
    .of(subsidiaries)
    .required()
    .min(1)
    .test(
      'stockAmountQuantity',
      'El stock de las sucursales tiene que ser igual a la cantidad del detalle',
      (value, schema) => {
        const subsidiariesTotalAmount = value
          .map(({ stock }) => Number(stock))
          .reduce((prev, current) => prev + current, 0);
        const { cantMax } = schema.parent;
        return subsidiariesTotalAmount === Number(cantMax);
      },
    ),
});

const purchases = yup.object().shape({
  fecha: yup.string().required(),
  idProv: yup
    .object()
    .required()
    .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value.id !== '0'),
  idEmp: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  codCompra: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  detalle: yup.array().of(products).required().min(1),
  sucursalesProductos: yup.array().of(subsidiariesProducts).required().min(1),
});

export default purchases;
