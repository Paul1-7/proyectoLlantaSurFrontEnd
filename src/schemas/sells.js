import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const products = yup.object().shape({
  idProd: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  cantidad: yup.string().matches(regex.number, msg.number).required()
});

const sells = ({ initialCustomer }) =>
  yup.object().shape({
    fecha: yup.date().required(),
    idCliente: yup
      .string()
      .matches(regex.alphaNumeric, msg.alphaNumeric)
      .test('isInitialCustomer', 'Tiene que seleccionar un valor', (value) => value === initialCustomer)
      .test('isNullCustomer', 'Tiene que seleccionar un valor', (value) => value === null),
    idVendedor: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
    idSucursal: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
    sucursales: yup.array().of(products).required().min(1)
  });

export default sells;
