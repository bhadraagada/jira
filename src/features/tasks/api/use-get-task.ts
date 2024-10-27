import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetTaskProps {
  workspaceId: string;
}

export const useGetTask = ({ workspaceId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const res = await client.api.tasks.$get({
        query: {
          workspaceId,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to Fetch Tasks");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
