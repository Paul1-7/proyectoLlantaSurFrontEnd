import * as yup from 'yup';

const login = yup.object().shape({
  usuario: yup.string().required(),
  password: yup.string().required(),
});

export default login;
