"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useUpdateTasksModal } from "../hooks/use-update-task-modal";
import { UpdateTasksFormWrapper } from "./update-task-form-wrapper";

export const UpdateTasksModal = () => {
  const { taskId, close } = useUpdateTasksModal();
  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <UpdateTasksFormWrapper onCancel={close} id={taskId}/>}
    </ResponsiveModal>
  );
};
