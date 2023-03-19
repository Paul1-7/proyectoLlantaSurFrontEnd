import { Divider, Typography } from '@mui/material';
import React from 'react';
import { ShopContainerListProducts } from '~/components/shop';

function ShopAbout() {
  return (
    <ShopContainerListProducts title="Acerca de nosotros" titleContainer="Acerca de nosotros">
      <Typography sx={{ pt: 6, pb: 2 }}>
        Somos una empresa dedicada a ofrecer repuestos automotrices para autos y motocicletas de alta calidad a través
        de nuestra tienda en línea. Nuestra empresa fue fundada en 2015 por un equipo de entusiastas del automovilismo
        que querían ofrecer soluciones innovadoras y convenientes a los conductores en todo el país.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h5" sx={{ pb: 2 }}>
        Misión, visión y valores
      </Typography>
      <Typography variant="h6" sx={{ pb: 2 }}>
        Misión
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Nuestra misión es proporcionar a nuestros clientes los mejores repuestos automotrices para mantener sus
        vehículos en óptimas condiciones de funcionamiento y garantizar su seguridad en la carretera. Ofrecemos una
        amplia variedad de productos de alta calidad, desde piezas de motor hasta accesorios de exterior, todo a precios
        competitivos y con un servicio de atención al cliente excepcional.
      </Typography>
      <Typography variant="h6" sx={{ pb: 2 }}>
        Visión
      </Typography>
      <Typography sx={{ pb: 2 }}>
        En nuestra visión, nos vemos liderando el mercado de repuestos automotrices en línea, siendo reconocidos como la
        tienda en línea más confiable y respetada del país. Para lograr esto, estamos constantemente buscando nuevas
        formas de innovar y mejorar la experiencia de compra de nuestros clientes.
      </Typography>
      <Typography variant="h6" sx={{ pb: 2 }}>
        Valores
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Nuestros valores son la honestidad, el compromiso, la innovación y la satisfacción del cliente. Queremos que
        nuestros clientes confíen en nosotros y nos recomienden por nuestra seriedad y profesionalismo.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography sx={{ pb: 2 }}>
        Nos guiamos por valores como la honestidad, la integridad, el compromiso con la calidad y la excelencia en el
        servicio al cliente. Somos un equipo de expertos apasionados por el mundo del automovilismo, con años de
        experiencia en la industria, lo que nos permite brindar a nuestros clientes una atención personalizada y
        conocimientos técnicos.excepcional.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Nos enorgullece ofrecer repuestos de alta calidad y con un compromiso ambiental en nuestra cadena de suministro.
        Trabajamos con proveedores éticos y responsables con el medio ambiente, y también hacemos esfuerzos para reducir
        nuestro impacto ambiental en nuestra propia operación.
      </Typography>
    </ShopContainerListProducts>
  );
}

export default ShopAbout;
