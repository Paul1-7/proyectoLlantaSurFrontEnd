import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import useLocalStorage from '~/hooks/useLocalStorage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [token, setToken] = useLocalStorage('control', { accessToken: '', refreshToken: '' });

  const setAuthToken = (response) => {
    const decodedToken = jwtDecode(response.accessToken);
    setAuth(response);
  };

  return <AuthContext.Provider value={{ auth, setAuthToken, setAuth }}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
