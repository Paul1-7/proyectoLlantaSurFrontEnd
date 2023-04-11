import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const item = yup.object().shape({
  idProd: yup.object().shape({
    id: yup.string().notOneOf(['0'], 'El id no puede ser cero'),
    nombre: yup.string(),
  }),
  urlImg: yup.string().matches(regex.url, msg.url).required(),
  estado: yup.string().required().matches(regex.number, msg.number),
});
const sliderImages = yup.object().shape({
  sliders: yup.array().of(item).required(),
});

export default sliderImages;
