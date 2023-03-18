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

  function isExpiredToken() {
    if (!auth?.accessToken) return false;

    const { exp = 0 } = jwtDecode(auth.accessToken) ?? {};

    return Date.now() >= exp * 1000;
  }

  function logOut() {
    setAuth(null);
    window.localStorage.removeItem('persist');
  }

  useEffect(() => {
    const token = window.localStorage.getItem('persist');

    if (!token) return;

    const tokenParsed = JSON.parse(token);
    const accessTokenDecoded = jwtDecode(tokenParsed.accessToken);
    setAuth({
      user: accessTokenDecoded,
      accessToken: tokenParsed.accessToken,
      refreshToken: tokenParsed.refreshToken,
    });

    if (Date.now() >= accessTokenDecoded.exp * 1000) {
      window.localStorage.removeItem('persist');
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
      value={{
        auth,
        setAuthToken,
        setAuth,
        lastHttpRequestTime,
        setLastHttpRequestTime,
        autoRefresh,
        setAutoRefresh,
        isExpiredToken,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
