import { snakeToTitleCase } from "@/lib/utils";
import { TaskStatus } from "../types";

import { Button } from "@/components/ui/button";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";
import { useCreateTasksModal } from "../hooks/use-create-tasks-modal";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="szie-[18px] text-pink-500/90" />
  ),
  [TaskStatus.TODO]: <CircleIcon className="szie-[18px] text-red-500/90" />,
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="szie-[18px] text-yellow-500/90" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="szie-[18px] text-blue-500/90" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="szie-[18px] text-green-500/90" />
  ),
};

export const KanbanColumnHeader = ({
  board,
  taskCount,
}: KanbanColumnHeaderProps) => {
  const { open } = useCreateTasksModal();
  const icon = statusIconMap[board];

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">{snakeToTitleCase(board)}</h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-neutral-700 font-medium  transition hover:bg-neutral-300 hover:text-neutral-800">
          {taskCount}
        </div>
      </div>
      <Button
        onClick={open}
        variant="ghost"
        className="size-5 hover:bg-neutral-300"
        size={"icon"}
      >
        <PlusIcon className="h-4 w-4 text-neutral-500 hover:text-neutral-700" />
      </Button>
    </div>
  );
};
