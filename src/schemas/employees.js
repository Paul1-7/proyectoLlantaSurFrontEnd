import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const employees = yup.object().shape({
  usuario: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  email: yup.string().email(),
  password: yup.string().matches(regex.password, msg.password),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Las constraseñas no coinciden'),
  nombre: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  apellido: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  estado: yup.string().required().matches(regex.number, msg.number),
  direccion: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  celular: yup.string().required().matches(regex.tel, msg.tel),
  ciNit: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  idSuc: yup
    .string()
    .required()
    .test('idSuc-test', 'Debe seleccionar otra opción', (value) => value !== '0'),
  roles: yup.array().min(1).required(),
});

export default employees;
