import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.members[":memberId"].$delete({ param });

      if (!res.ok) throw new Error();

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Member Deleted");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("Failed to Delete Member");
    },
  });

  return mutation;
};
