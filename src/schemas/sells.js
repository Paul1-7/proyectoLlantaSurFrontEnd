import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const products = yup.object().shape({
  idProd: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  cantidad: yup.string().matches(regex.number, msg.number).required(),
});

const sells = yup.object().shape({
  fecha: yup.string().required(),
  idCliente: yup
    .object()
    .required()
    .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== '0'),
  idVendedor: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  idSucursal: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  productos: yup.array().of(products).required().min(1),
});

export default sells;
