import { Typography } from '@mui/material';
import React from 'react';
import { ShopContainerListProducts } from '~/components/shop';

function ShopTermConditions() {
  return (
    <ShopContainerListProducts title="Términos y condiciones" titleContainer="Términos y condiciones">
      <Typography sx={{ pt: 6, pb: 2 }}>
        Los términos y condiciones de uso son las normas que regulan la relación entre usted (el cliente) y nosotros (la
        tienda online) cuando accede a nuestro sitio web y compra o contrata nuestros productos o servicios. Al aceptar
        estos términos y condiciones, usted se compromete a cumplir con las siguientes obligaciones:
      </Typography>
      <Typography sx={{ pb: 2 }}>- Registrarse con sus datos reales y mantenerlos actualizados.</Typography>
      <Typography sx={{ pb: 2 }}>
        - Usar el sitio web de forma responsable y respetuosa, sin vulnerar los derechos de propiedad intelectual o
        industrial de la tienda online o de terceros.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        - Pagar el precio de los productos o servicios que adquiera, incluyendo los impuestos y los gastos de envío que
        correspondan, según las formas de pago disponibles en el sitio web.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        - Aceptar las condiciones de entrega, devolución, garantía y reclamación de los productos o servicios que
        adquiera, según lo establecido en el sitio web.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Al aceptar estos términos y condiciones, usted también reconoce y acepta lo siguiente:
      </Typography>
      <Typography sx={{ pb: 2 }}>
        - Que la tienda online es titular o tiene licencia para usar todos los contenidos del sitio web, incluyendo
        textos, imágenes, logos, marcas y diseños.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        - Que la tienda online se reserva el derecho de modificar o suspender el sitio web o cualquiera de sus
        contenidos o servicios en cualquier momento y sin previo aviso.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        - Que la tienda online no se hace responsable por los daños o perjuicios que puedan derivarse del uso del sitio
        web o de la compra o contratación de sus productos o servicios, salvo que exista dolo o negligencia grave por su
        parte.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        - Que la tienda online cumple con la normativa vigente en materia de protección de datos personales y comercio
        electrónico, y que respeta su privacidad según lo establecido en nuestra política de privacidad.
      </Typography>
    </ShopContainerListProducts>
  );
}

export default ShopTermConditions;
