import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

export function useFetchData() {
  //   const result = useQuery({
  //     queryKey: ["tasks"],
  //     queryFn: () => customFetch.get("/"),
  //   });
  //   console.log(result);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  return { data, isLoading, isError, error };
}

export function useCreateData() {
  const queryClient = useQueryClient();

  // const result = useMutation({
  //   mutationFn: () => customFetch.post("/", { title: "Musa" }),
  // });
  // console.log(result);

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: (TaskTitle) => customFetch.post("/", { title: TaskTitle }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("tasks added");
      //   setNewItemName("");
    },

    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createPost, isLoading };
}

export function useEditData() {
  const queryClient = useQueryClient();

  const { mutate: editPost } = useMutation({
    mutationFn: ({ TaskId, isDone }) =>
      customFetch.patch(`/${TaskId}`, { isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { editPost };
}

export function useDeleteData() {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isLoading: deleteLoadingPost } = useMutation({
    mutationFn: (TaskId) => customFetch.delete(`/${TaskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { deletePost, deleteLoadingPost };
}
