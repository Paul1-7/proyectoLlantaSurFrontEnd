import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const brands = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  estado: yup.string().required().matches(regex.number, msg.number),
});

export default brands;
