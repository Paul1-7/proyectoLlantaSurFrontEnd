import * as yup from 'yup';

const recoveryPasswordEmail = yup.object().shape({
  email: yup.string().email().required(),
});

export default recoveryPasswordEmail;
