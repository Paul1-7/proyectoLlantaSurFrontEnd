import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const products = yup.object().shape({
  idProd: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  cantidad: yup.number().required(),
});

const sells = yup.object().shape({
  fecha: yup.string().required(),
  idCliente: yup
    .object()
    .shape({
      id: yup.string().notOneOf(['0'], 'El id no puede ser cero'),
      nombre: yup.string(),
    })
    .required()
    .test('idProv-test', 'Debe seleccionar otra opción', (value) => value.id !== '0'),
  idVendedor: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  idSucursal: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  productos: yup.array().of(products).required().min(1),
});

export default sells;
