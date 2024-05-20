import { useEffect } from "react";
import { useState } from "react";

function useFetch({ fetchFn }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchFn()
      .then((data) => {
        setData(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { data, isLoading, error };
}

export default useFetch;
