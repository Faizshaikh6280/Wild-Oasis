import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateuser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Account successfully updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isUpdating };
}
