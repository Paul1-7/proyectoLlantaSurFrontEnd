import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const subsidiaries = yup.object().shape({
  idSuc: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  stock: yup.string().matches(regex.number, msg.number).required()
});

const products = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  precioCompra: yup.string().matches(regex.float, msg.float).required(),
  precioVenta: yup.string().matches(regex.float, msg.float).required(),
  fecha: yup.date().required(),
  idProv: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  idCat: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  idMarca: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  sucursales: yup.array().of(subsidiaries).required(),
  imagen: yup.mixed(),
  estado: yup.string().required().matches(regex.number, msg.number)
});

export default products;
