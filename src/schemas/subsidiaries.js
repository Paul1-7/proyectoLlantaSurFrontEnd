import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const subsidiaries = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  direccion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  tel: yup.string().matches(regex.tel, msg.tel),
  estado: yup.string().required().matches(regex.number, msg.number)
});

export default subsidiaries;
