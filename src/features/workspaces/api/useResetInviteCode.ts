import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"]>;

export const useResetInviteCode = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.workspaces[":workspaceId"]["reset-invite-code"].$post({ param });

      if (!res.ok) throw new Error();

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Invite Code Changed");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Failed to Reset Invite Code");
    }
  });

  return mutation;
};
