import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const products = yup.object().shape({
  idProd: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  cantMax: yup.string().matches(regex.number, msg.number).required(),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  precio: yup.string().matches(regex.float, msg.float).required(),
});

const discounts = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  fechaInicio: yup.date().typeError('la fecha introducida es incorrecta').required(),
  fechaFin: yup
    .date()
    .typeError('la fecha introducida es incorrecta')
    .required()
    .min(yup.ref('fechaInicio'), 'no puede empezar antes la fecha de finalización')
    .when('fechaInicio', (fechaInicio, schema) => {
      if (fechaInicio != null) {
        return schema.min(fechaInicio, 'la fecha de finalizacion tiene que ser mayor  que la de inicio');
      }
      return schema.min(new Date());
    }),
  estado: yup.string().required().matches(regex.number, msg.number),
  productos: yup.array().of(products).required().min(1),
});

export default discounts;
