import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const inventaryReport = yup.object().shape({
  criterio: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== '0'),
  sucursal: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== '0'),
});

export default inventaryReport;
