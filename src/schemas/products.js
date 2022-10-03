import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const products = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  precioCompra: yup.string().matches(regex.float, msg.float).required(),
  precioVenta: yup.string().matches(regex.float, msg.float).required(),
  fecha: yup.date().required(),
  idProv: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  idCat: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  idMarca: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  stock: yup.string().matches(regex.number, msg.number),
  sucarsales: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  imagen: yup
    .mixed()
    .test('name', 'la imagen es requerida', (value) => value !== undefined && value && value?.name !== ''),
  estado: yup.string().required().matches(regex.number, msg.number)
});

export default products;
