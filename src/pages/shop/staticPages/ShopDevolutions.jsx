import { Typography } from '@mui/material';
import React from 'react';
import { ShopContainerListProducts } from '~/components/shop';

function ShopDevolutions() {
  return (
    <ShopContainerListProducts
      title="Políticas de devoluciones y cambios"
      titleContainer="Políticas de devoluciones y cambios"
    >
      <Typography sx={{ pt: 6, pb: 2 }}>
        En nuestra tienda de repuestos automotrices, llantas y accesorios, nos esforzamos por ofrecer productos de
        calidad y garantizar la satisfacción de nuestros clientes. Sin embargo, entendemos que en algunas ocasiones
        puede ser necesario devolver o cambiar algún producto por diversos motivos. Por eso, hemos establecido las
        siguientes políticas de devoluciones y cambios:
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Si el producto que recibió no cumple con sus expectativas o desea cambiarlo por otro modelo, tamaño o color,
        puede solicitar el cambio del mismo dentro de los 10 días hábiles siguientes a la fecha de entrega. Debe
        presentar el comprobante de compra y el producto en su empaque original con todos sus accesorios. El producto
        debe estar en perfecto estado y no haber sido usado ni instalado. Usted deberá asumir los costos del envío del
        producto a nuestra tienda y del nuevo producto que solicite. El cambio está sujeto a la disponibilidad de stock
        y a las diferencias de precio entre los productos
      </Typography>
      <Typography sx={{ pb: 2 }}>
        No se aceptan devoluciones ni cambios de productos que hayan sido usados, instalados, modificados o alterados
        por el cliente o por terceros. Tampoco se aceptan devoluciones ni cambios de productos que sean personalizados o
        hechos a medida según las especificaciones del cliente.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        En caso de tener alguna duda o inconveniente con su compra, puede contactarnos a través de nuestros numeros de
        contacto
      </Typography>
    </ShopContainerListProducts>
  );
}

export default ShopDevolutions;
