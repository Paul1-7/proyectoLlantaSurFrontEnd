import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const roles = yup.object().shape({
  idRol: yup.string().required()
});

const employees = yup.object().shape({
  usuario: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  email: yup.string().email(),
  password: yup.string().matches(regex.password, msg.password),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Las constraseñas no coinciden'),
  nombre: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  apellido: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  estado: yup.string().required().matches(regex.number, msg.number),
  direccion: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  celular: yup.string().required().matches(regex.number, msg.number),
  ciNit: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  idSuc: yup.string().required(),
  roles: yup.array().required()
});

export default employees;
