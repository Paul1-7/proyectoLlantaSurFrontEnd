import { Typography } from '@mui/material';
import React from 'react';
import { ShopContainerListProducts } from '~/components/shop';

function ShopWarranties() {
  return (
    <ShopContainerListProducts title="Garantías" titleContainer="Garantías">
      <Typography variant="h6" sx={{ pt: 6, pb: 2 }}>
        Condiciones de la garantía de repuestos vendidos en nuestra tienda
      </Typography>
      <Typography sx={{ pb: 2 }}>
        En nuestra tienda ofrecemos garantía de que los repuestos vendidos funcionen correctamente, caso contrario se
        realizara el cambio del repuesto, esta garantia es valida siempre y cuando se instalen correctamente y se
        cumplan con las revisiones oficiales marcadas por el fabricante del vehículo. Esta garantía cubre los fallos
        eléctricos, electrónicos y mecánicos que puedan presentarse en los repuestos adquiridos, excepto las partes o
        elementos de fricción como pastillas de freno, bandas de freno, discos y campanas de freno, discos de embrague,
        anillos de pistón y volantes de inercia.
      </Typography>
      <Typography variant="h6" sx={{ pb: 2 }}>
        Requisitos para hacer efectiva la garantía de productos adquiridos en nuestra tienda
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Para hacer efectiva la garantía es necesario presentar la factura original de compra. En caso de que se detecte
        alguna anomalía en los productos adquiridos en nuestra tienda, nos comprometemos a repararlos o reemplazarlos
        sin costo alguno para el cliente.
      </Typography>
      <Typography sx={{ pb: 2 }}>
        Nuestro objetivo es brindarle la mejor calidad y servicio en repuestos automotrices, llantas y accesorios para
        su vehículo. Si tiene alguna duda o consulta sobre nuestra política de garantías puede contactarnos.
      </Typography>
    </ShopContainerListProducts>
  );
}

export default ShopWarranties;
