import { useCallback, useEffect, useState } from "react";

async function sendHttpReq(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new error(
      resData.message || "Something went wrong, failed sending request"
    );
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const responseData = await sendHttpReq(url, { ...config, body: data });
        setData(responseData);
      } catch (error) {
        setError(error.message || "Somethimg went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET") || !config.method || !config) {
      sendRequest();
    }
  }, [sendRequest]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
