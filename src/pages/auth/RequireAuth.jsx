import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import PropTypes from 'prop-types';
import { PATH_MODULES } from '~/routes/paths';

function RequireAuth({ allowedRoles, children }) {
  const { auth } = useAuth();
  const location = useLocation();
  const roles = auth?.user?.roles ?? [];

  if (roles.find((role) => allowedRoles?.includes(role))) {
    return children;
  }
  if (auth?.user) {
    return <Navigate to={PATH_MODULES.auth.unauthorized} state={{ from: location }} replace />;
  }

  return <Navigate to={PATH_MODULES.auth.signIn} state={{ from: location }} replace />;
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

export default RequireAuth;
