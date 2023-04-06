import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, MenuItem, Typography, alpha, Stack } from '@mui/material';
// components
import { MIconButton } from '~/components/@material-extend';
import MenuPopover from '~/components/MenuPopover';
import useAuth from '~/hooks/useAuth';
import { getNamesRolesFromIds } from '~/utils/dataHandler';
import { Avatar, Label } from '~/components';
import useAxios from '~/hooks/useAxios';
import { LoadingButton } from '@mui/lab';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { PATH_MODULES } from '~/routes/paths';

const MENU_OPTIONS = [
  { label: 'Inicio', icon: homeFill, linkTo: '/' },
  { label: 'Perfil', icon: personFill, linkTo: PATH_MODULES.auth.profile },
];

export default function AccountPopover() {
  const { auth, logOut } = useAuth();
  const { nombre, apellido } = auth?.user ?? {};
  const axiosPrivate = useAxiosPrivate();
  const [, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const nameRoles = getNamesRolesFromIds(auth.user.roles);
  useSnackBarMessage({
    errrors: [errorPost],
  });

  const onSubmit = () => {
    const data = {
      token: auth.refreshToken,
    };

    axiosFetchPost({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/auth/logout`,
      requestConfig: {
        ...data,
      },
    });
    logOut();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar name={`${nombre} ${apellido}`} />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" align="center" noWrap sx={{ mb: 2 }}>
            {`${nombre} ${apellido}`}
          </Typography>
          <Stack gap={1}>
            {nameRoles.map((rol) => (
              <Label key={rol} variant="filled">
                {rol}
              </Label>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <LoadingButton
            loading={loadingPost}
            type="button"
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={onSubmit}
          >
            Cerrar sesión
          </LoadingButton>
        </Box>
      </MenuPopover>
    </>
  );
}
