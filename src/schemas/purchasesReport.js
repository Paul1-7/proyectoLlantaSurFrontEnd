import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const purchasesReport = yup.object().shape({
  criterio: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== '0'),
  orderBy: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== '0'),
  dateStart: yup.date(),
  dateEnd: yup.date(),
});

export default purchasesReport;
