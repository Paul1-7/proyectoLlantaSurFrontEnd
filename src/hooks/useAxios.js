import { useState, useEffect } from 'react';

const useAxios = (callback = null) => {
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

          signal: ctrl.signal
        },
        headers
      );
      res = callback ? callback(res) : res;

      setResponse(res.data);
      setError(null);
    } catch (err) {
      const value = err.response?.data;
      setError(value ?? err);
      setResponse([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () =>
      // useEffect cleanup function
      () =>
        controller && controller.abort(),
    [controller]
  );

  return [response, error, loading, axiosFetch, setResponse, setError];
};

export default useAxios;
