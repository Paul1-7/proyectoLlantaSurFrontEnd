import { msg, regex } from 'constants/validations';
import * as yup from 'yup';

const businessData = yup.object().shape({
  numDoc: yup.string().matches(regex.number, msg.number),
  cantMinProd: yup.string().matches(regex.number, msg.number),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  actividadEco: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  leyenda: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  email: yup.string().email(),
  tel: yup.string().required().matches(regex.tel, msg.tel),
  direccion: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  ciudad: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric)
});

export default businessData;
