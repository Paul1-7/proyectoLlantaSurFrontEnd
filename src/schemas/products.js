import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const subsidiaries = yup.object().shape({
  idSuc: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  stock: yup.string().matches(regex.number, msg.number).required(),
});

const products = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  precioCompra: yup.number().typeError('El precio de compra debe ser un número').required(),
  precioVenta: yup
    .number()
    .typeError('El precio de venta debe ser un número')
    .required()
    .when('precioCompra', (precioCompra, schema) => {
      if (precioCompra) {
        return schema.moreThan(precioCompra, 'El precio de venta debe ser mayor al precio de compra');
      }
      return schema;
    }),
  idProv: yup
    .object()
    .shape({
      id: yup.string().notOneOf(['0'], 'El id no puede ser cero'),
      nombre: yup.string(),
    })
    .test('idProv-test', 'Debe seleccionar otra opción', (value) => value.id !== '0'),
  idCat: yup
    .object()
    .shape({
      id: yup.string().notOneOf(['0'], 'El id no puede ser cero'),
      nombre: yup.string(),
    })
    .test('idCat-test', 'Debe seleccionar otra opción', (value) => value.id !== '0'),
  idMarca: yup
    .object()
    .shape({
      id: yup.string().notOneOf(['0'], 'El id no puede ser cero'),
      nombre: yup.string(),
    })
    .test('idBrand-test', 'Debe seleccionar otra opción', (value) => value.id !== '0'),
  sucursales: yup.array().of(subsidiaries),
  imagen: yup.mixed().nullable(),
  stockMin: yup.number().required().min(1, 'el minimo es 1').typeError('Debe de ser un número'),
  estado: yup.string().required().matches(regex.number, msg.number),
});

export default products;
