/* eslint-disable @typescript-eslint/no-unused-vars */
import { MemberAvatar } from "@/features/members/components/member-Avatar";
import { Project } from "@/features/projects/types";
import { cn } from "@/lib/utils";
import { Task, TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { useRouter } from "next/navigation";
import { DottedSeparator } from "@/components/dotted-sep";

interface EventCardProps {
  title: string;
  assignee: string;
  project: Project;
  status: TaskStatus;
  id: string;
  task: Task[];
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500 bg-pink-500/20",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500 bg-yellow-500/20",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500 bg-blue-500/20",
  [TaskStatus.DONE]: "border-l-green-500 bg-green-500/20",
  [TaskStatus.TODO]: "border-l-red-500 bg-red-500/20",
};

export const EventCard = ({
  title,
  assignee,
  project,
  status,
  id,
  task
}: EventCardProps) => {
  console.log({"EventCardProps": {task}});
  
  const workspaceId = useWorkspaceId();
  const  router = useRouter();

  const onClick = (
    e: React.MouseEvent<HTMLDivElement> 
  ) => {
    e.stopPropagation();

    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  }

  return (
    <div className="px-2">
      <div
      onClick={onClick}
        className={cn(
          "p-1.5 text-sm bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          statusColorMap[status]
        )}
      >
        <p className="text-sm truncate">{title}</p>
        <div className="flex items-center gap-x-1 justify-between">
          <MemberAvatar
            name={assignee}
            fallbackClassName="text-xs font-medium"
          />
          <DottedSeparator />
          <ProjectAvatar 
          name={task.find((t) => t.$id === id)?.project.name}
          image={task.find((t) => t.$id === id)?.project.imageUrl}
          fallbackClassName="text-xs font-medium"
          />
        </div>
      </div>
    </div>
  );
};
