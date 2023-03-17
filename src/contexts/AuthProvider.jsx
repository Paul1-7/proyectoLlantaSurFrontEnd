import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [lastHttpRequestTime, setLastHttpRequestTime] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  // let intervalTokenRefresh;

  // useEffect(() => {
  //   const refresh = async () => {
  //     intervalTokenRefresh = setInterval(async () => {
  //       if (lastHttpRequestTime === null || Date.now() - lastHttpRequestTime > 10 * 1000) {
  //         setAutoRefresh(true);
  //       }
  //     }, 10 * 1000);
  //   };
  //   refresh();
  //   return () => clearInterval(intervalTokenRefresh);
  // }, [lastHttpRequestTime]);

  useEffect(() => {
    const token = window.localStorage.getItem('persist');

    if (token) {
      const tokenParsed = JSON.parse(token);
      const accessTokenDecoded = jwtDecode(tokenParsed.accessToken);
      setAuth({
        user: accessTokenDecoded,
        accessToken: tokenParsed.accessToken,
        refreshToken: tokenParsed.refreshToken,
      });
    }
  }, []);

  const setAuthToken = (response) => {
    setAuth(response);
    localStorage.setItem(
      'persist',
      JSON.stringify({ accessToken: response.accessToken, refreshToken: response.refreshToken }),
    );
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuthToken, setAuth, lastHttpRequestTime, setLastHttpRequestTime, autoRefresh, setAutoRefresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
