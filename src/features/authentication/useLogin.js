import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoging } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success("Successfully login");
      navigate("/");
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isLoging };
}
