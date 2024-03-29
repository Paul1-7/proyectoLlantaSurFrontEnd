import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const register = yup.object().shape({
  usuario: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  email: yup.string().email().required(),
  password: yup.string().matches(regex.password, msg.password).required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Las constraseñas no coinciden'),
  nombre: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  apellido: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  direccion: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  celular: yup.string().required().matches(regex.tel, msg.tel),
  ciNit: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
});

export default register;
