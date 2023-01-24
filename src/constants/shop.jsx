import { Cached, PhoneInTalk, LocalShipping, Payment } from '@mui/icons-material';

export const CARDS_INFO = [
  {
    id: '1',
    title: 'Stock Actualizado',
    subtitle: 'Permanentemente',
    icon: <Cached color="primary" sx={{ height: '50%', width: '50%' }} />,
  },
  {
    id: '2',
    title: 'Llamanos',
    subtitle: '718198xx',
    icon: <PhoneInTalk color="primary" sx={{ height: '50%', width: '50%' }} />,
  },
  {
    id: '3',
    title: 'Envio rapido',
    subtitle: 'Entregas en menos de 24 horas',
    icon: <LocalShipping color="primary" sx={{ height: '50%', width: '50%' }} />,
  },
  {
    id: '4',
    title: 'Pagos seguros',
    subtitle: 'Seriedad y confianza',
    icon: <Payment color="primary" sx={{ height: '50%', width: '50%' }} />,
  },
];
