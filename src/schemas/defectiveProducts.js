import { msg, regex } from '~/constants/validations';
import * as yup from 'yup';

const data = yup.object().shape({
  descripcion: yup
    .string()
    .when('cantidad', {
      is: (val) => Number(val) >= 1,
      then: () => yup.string().required(),
      otherwise: () => yup.string(),
    })
    .matches(regex.alphaNumeric, msg.alphaNumeric),
  cantidad: yup
    .number()
    .required()
    .test('stockCheck', 'La cantidad no puede ser mayor al stock', (val, e) => {
      const stock = e.parent.stock ? Number(e.parent.stock) : null;
      const cantidad = val ? Number(val) : null;
      if (cantidad && stock && cantidad > stock) {
        return false; // validation failed
      }
      return true; // validation passed
    }),
  fecha: yup.date(),
  idProd: yup.string().required().matches(regex.alphaNumeric, msg.alphaNumeric),
  idVenta: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  cantidadVendida: yup.string().matches(regex.number, msg.number),
  stock: yup.string().matches(regex.number, msg.number),
  producto: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
});

const defectiveProducts = yup.object().shape({
  data: yup.array().of(data),
});

export default defectiveProducts;
