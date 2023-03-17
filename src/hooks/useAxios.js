import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_MODULES } from '~/routes/paths';

const useAxios = ({ customErrorMessages = null, intervalClearError = 2000, responseCb = null } = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, headers = {}, url, requestConfig = {} } = configObj;
    let res;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      res = await axiosInstance[method.toLowerCase()](
        url,
        requestConfig,
        {
          ...requestConfig,

          signal: ctrl.signal,
        },
        headers,
      );
      res = responseCb ? responseCb(res) : res;

      setResponse(res.data);
      setError(null);
    } catch (err) {
      if (customErrorMessages) {
        customErrorMessages(err, setError);
      }

      if (err.response?.status === 403) {
        navigate(PATH_MODULES.auth.signIn, { state: { from: location }, replace: true });
      } else {
        const value = err.response?.data;
        setError(value ?? err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;
    const intervalError = setInterval(() => {
      setError(null);
    }, intervalClearError);

    return function cleanup() {
      clearInterval(intervalError);
    };
  }, [error]);

  useEffect(
    () =>
      // useEffect cleanup function
      () => {
        controller?.abort();
      },
    [controller],
  );

  return [response, error, loading, axiosFetch, setResponse, setError];
};

export default useAxios;
