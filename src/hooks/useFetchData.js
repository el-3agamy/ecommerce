import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const useFetchData = (endpoint) => {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchData", endpoint],
    queryFn: () => api.get(`/${endpoint}`),
    select: (res) => res.data.data,
  });
  return { isLoading, data };
};

export default useFetchData;