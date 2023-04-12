import { Outlet, useLocation } from 'react-router-dom';
import { PATH_MODULES } from '~/routes/paths';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

export default function MainLayout() {
  const location = useLocation();
  const { signIn, signUp, profile, verifyPhoneNumber, resetPasswordEmail: resetPassword } = PATH_MODULES.auth;
  const paths = [signIn, signUp, profile, verifyPhoneNumber, resetPassword];
  const isPathIncluded = paths.some((path) => location.pathname.includes(path));
  return (
    <>
      {!isPathIncluded && <MainNavbar />}
      <div>
        <Outlet />
      </div>
      <MainFooter />
    </>
  );
}
