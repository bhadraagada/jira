import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

export const useDeleteProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.projects[":projectId"].$delete({ param });

      if (!res.ok) throw new Error();

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Project Deleted");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
    },
    onError: () => {
      toast.error("Failed to Delete project");
    },
  });

  return mutation;
};
