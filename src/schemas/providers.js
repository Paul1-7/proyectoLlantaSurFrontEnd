import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const providers = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  tel: yup.string().matches(regex.tel, msg.tel),
  nombreEnc: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  apEnc: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  estado: yup.string().required().matches(regex.number, msg.number)
});

export default providers;
