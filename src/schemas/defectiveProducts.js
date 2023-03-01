import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const data = yup.object().shape({
  descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  cantidad: yup.string().required().matches(regex.number, msg.number),
  fecha: yup.date().required(),
  idProd: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  idVenta: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  cantidadVendida: yup.string().matches(regex.number, msg.number),
  stock: yup.string().matches(regex.number, msg.number),
  producto: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
});

const defectiveProducts = yup.object().shape({
  data: yup.array().of(data),
});

export default defectiveProducts;
