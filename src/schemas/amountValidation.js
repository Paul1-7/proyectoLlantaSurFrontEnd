import * as yup from 'yup';

const amountValidation = (maxValue = 0) => {
  return yup.object().shape({
    amount: yup.string().test('amount-test', `La cantidad no puede ser mayor a ${maxValue}`, (value) => {
      return Number(value) <= maxValue;
    }),
  });
};

export default amountValidation;
