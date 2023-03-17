import axios from '~/apis/apis';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    const response = await axios.post('/api/v1/usuarios/refresh', { token: auth.refreshToken });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
