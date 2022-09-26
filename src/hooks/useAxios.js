import { useState, useEffect } from 'react';

const useAxios = (callback = null) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    let res;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal
      });
      res = callback ? callback(res) : res;
      console.log('TCL: axiosFetch -> res', res);

      setResponse(res.data);
      setError(null);
    } catch (err) {
      const value = err?.response?.data;
      setError(typeof value === 'string' ? value : err.message);
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

  return [response, error, loading, axiosFetch, setResponse];
};

export default useAxios;
