import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';
import tire from '~/assets/icons/tire.svg';
// routes
import { PATH_MODULES } from '~/routes/paths';
import SvgIconStyle from '~/components/SvgIconStyle';

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Products',
    path: PATH_MODULES.shop.products,
    icon: <SvgIconStyle src={tire} {...ICON_SIZE} />,
  },
  { title: 'Dashboard', path: PATH_MODULES.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  {
    title: 'Categorias',
    path: PATH_MODULES.shop.categories,
    icon: <Icon icon={cubeFill} {...ICON_SIZE} />,
    children: [{ title: 'Categorias', path: PATH_MODULES.shop }],
  },
];

export default menuConfig;
