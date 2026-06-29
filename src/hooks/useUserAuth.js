import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { authContext } from "../contexts/authContext";

export default function useUserAuth(endpoint, redirectPath) {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(authContext);

  const mutation = useMutation({
    mutationFn: (values) => api.post(`/auth/${endpoint}`, values),

    onSuccess: ({ data }) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.message === "success") {
        setIsLoggedIn(true);
        navigate(`/${redirectPath}`);
      }
    },
  });

  return {
    submitAuth: mutation.mutate,
    isLoading: mutation.isPending,
    errorMsg: mutation.error?.response?.data?.message,
  };
}
