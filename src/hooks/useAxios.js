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
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
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

  return { response, setResponse, error, loading, axiosFetch };
};

export default useAxios;
