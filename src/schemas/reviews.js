import * as yup from 'yup';
import { msg, regex } from '~/constants/validations';

const reviews = yup.object().shape({
  titulo: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  calificacion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
});

export default reviews;
