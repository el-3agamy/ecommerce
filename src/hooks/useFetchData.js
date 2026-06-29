// import { useQuery } from "@tanstack/react-query";
// import api from "../utils/api";

// const useFetchData = (endpoint) => {
//   const { isLoading, data } = useQuery({
//     queryKey: ["fetchData", endpoint],
//     queryFn: () => api.get(`/${endpoint}`),
//     select: (res) => res.data.data,
//   });
//   return { isLoading, data };
// };

// export default useFetchData;

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const useFetchData = (endpoint, page = 1 , limit = 8) => {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchData", endpoint, page],
    queryFn: () =>
      api.get(`/${endpoint}?page=${page}&limit=${limit}` ),
    select: (res) => res.data,
  });

  return {
    isLoading,
    products: data?.data,
    pagination: data?.metadata, // or paginationResult depending on your API
  };
};

export default useFetchData;