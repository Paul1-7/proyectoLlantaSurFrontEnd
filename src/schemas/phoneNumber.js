import * as yup from 'yup';

const phoneNumber = yup.object().shape({
  celular: yup.string().required(),
});

export default phoneNumber;
