import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      toast.success("Account successfully created please verify your email.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signUp, isLoading };
}
