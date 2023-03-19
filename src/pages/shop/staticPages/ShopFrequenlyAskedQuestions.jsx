import { Divider, Typography } from '@mui/material';
import React from 'react';
import { ShopContainerListProducts } from '~/components/shop';

function ShopFrequenlyAskedQuestions() {
  return (
    <ShopContainerListProducts title="Preguntas frecuentes" titleContainer="Preguntas frecuentes">
      <Typography sx={{ pt: 6, pb: 2 }}>
        Si tienes alguna duda sobre los repuestos automotrices que vendemos en nuestra tienda en línea, consulta las
        siguientes preguntas frecuentes y sus respuestas. Esperamos que te sean de utilidad para realizar tu compra con
        confianza y seguridad.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" sx={{ pb: 2 }}>
        - ¿Qué tipos de repuestos automotrices ofrecen?
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Ofrecemos repuestos genuinos, originales y alternos de las mejores marcas del mercado, como Honda, Hyundai, Jeep
        Mitsubishi, Nissan. Contamos con una amplia variedad de llantas para todo tipo de terreno.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" sx={{ pb: 2 }}>
        - ¿Cómo puedo saber si el repuesto que necesito está disponible?
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Puedes consultar la disponibilidad del repuesto que buscas en nuestro catálogo en línea. Solo tienes que
        ingresar el nombre del producto en el buscador y verás si hay existencias o no. También puedes filtrar los
        resultados por marca para facilitar tu búsqueda.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" sx={{ pb: 2 }}>
        - ¿Cómo puedo pagar mi pedido?
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Puedes pagar tu pedido con tarjeta de débito, PayPal, pagos Qr. Todos nuestros métodos de pago son seguros y
        confiables. Te enviaremos una confirmación por correo electrónico una vez que hayamos recibido tu pago.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" sx={{ pb: 2 }}>
        - ¿Cuánto tiempo tarda el envío y cuánto cuesta?
      </Typography>
      <Typography sx={{ pb: 2 }}>
        El tiempo de envío depende del destino, ofrecemos envíos a todo el país. El costo del envío se calcula según el
        peso y las dimensiones del paquete para enviarlo en flota o avión. Si la compra es dentro del departamento de
        Tarija se utilizaran servicios de terceros, y el costo se define con ellos. Si la compra es de mayor o igual a
        500 Bs el envío sera gratuito.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" sx={{ pb: 2 }}>
        - ¿Qué opciones de pago estan disponibles?
      </Typography>
      <Typography sx={{ pb: 2 }}>
        {' '}
        Por el momento los métodos de pagos disponibles son pagos en tienda y pago por código QR simpre
      </Typography>
    </ShopContainerListProducts>
  );
}

export default ShopFrequenlyAskedQuestions;
