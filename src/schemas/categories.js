import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const categories = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number),
});

export default categories;
