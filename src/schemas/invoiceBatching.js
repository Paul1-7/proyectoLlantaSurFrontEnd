import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const invoiceBatching = yup.object().shape({
  numAutorizacion: yup.string().matches(regex.number, msg.number),
  numFactInicial: yup.string().matches(regex.number, msg.number),
  llaveDosificacion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  fechaLimEmision: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric)
});

export default invoiceBatching;
