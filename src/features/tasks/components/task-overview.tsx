import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Task } from "../types";
import { DottedSeparator } from "@/components/dotted-sep";
import { OverviewProperty } from "./overview-property-task";
import { MemberAvatar } from "@/features/members/components/member-Avatar";
import TaskDate from "./task-date";
import { Badge } from "@/components/ui/badge";
import { snakeToTitleCase } from "@/lib/utils";
import { useUpdateTasksModal } from "../hooks/use-update-task-modal";

interface TaskOverviewProps {
  task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const {open} = useUpdateTasksModal()

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button onClick={() => open(task.$id)} size={"sm"} variant={"secondary"}>
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4"/>
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name}  className="size-6"/>
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium p-2" />
            </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};