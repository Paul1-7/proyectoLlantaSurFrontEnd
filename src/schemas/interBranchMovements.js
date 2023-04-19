import * as yup from 'yup';
import { msg, regex } from '~/constants/validations';

const interBranchMovements = (maxQuantity) =>
  yup.object().shape({
    cantidad: yup
      .number()
      .required()
      .min(1, 'el valor minimo es uno')
      .test('amount-test', `La cantidad no puede ser mayor a ${maxQuantity}`, (value) => {
        return Number(value) <= maxQuantity;
      })
      .typeError('el valor tiene que ser un número'),
    idProd: yup
      .object()
      .shape({
        id: yup.string().notOneOf(['0'], 'El id no puede ser cero'),
        nombre: yup.string(),
        sucursales: yup.array(),
      })
      .test('idProd-test', 'Debe seleccionar otra opción', (value) => value.id !== '0'),
    idSucOrigen: yup
      .string()
      .matches(regex.alphaNumeric, msg.alphaNumeric)
      .required()
      .test('idSucOrigen-test', 'Debe seleccionar otra opción', (value) => value !== '0'),
    idSucDestino: yup
      .string()
      .matches(regex.alphaNumeric, msg.alphaNumeric)
      .required()
      .test(
        'idSucOrigen-igual-idSucDestino',
        'la sucursal de origen debe ser diferente a la sucursal destino',
        (value, context) => {
          const { idSucOrigen } = context.parent;
          const idSucDestino = value;
          return idSucOrigen !== idSucDestino;
        },
      )
      .test('idSucDes-test', 'Debe seleccionar otra opción', (value) => value !== '0'),
    idUsuario: yup.string(),
  });

export default interBranchMovements;
