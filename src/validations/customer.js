import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const customer = yup.object().shape({
  usuario: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  email: yup.string().email(),
  password: yup.string().matches(regex.password, msg.password).required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Las constraseñas no coinciden'),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellido: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().matches(regex.number, msg.number).required(),
  direccion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  celular: yup.string().matches(regex.number, msg.number).required(),
  ciNit: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  idSuc: yup.string().required()
});

export default customer;
