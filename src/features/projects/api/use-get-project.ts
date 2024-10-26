import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetProjectProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectProps) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const res = await client.api.projects.$get({
        query: {
          workspaceId,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to Fetch Projects");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
