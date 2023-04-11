import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const recoveryPasswordForm = yup.object().shape({
  password: yup.string().matches(regex.password, msg.password).required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las constraseñas no coinciden')
    .required(),
});

export default recoveryPasswordForm;
