import axios from '~/apis/apis';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      '/api/v1/auth/refresh',
      { token: auth.refreshToken },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.refreshToken}`,
        },
      },
    );

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
    });
    localStorage.setItem('accessToken', JSON.stringify(response));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
