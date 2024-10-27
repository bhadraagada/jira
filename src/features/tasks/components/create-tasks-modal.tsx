"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useCreateTasksModal } from "../hooks/use-create-tasks-modal";
import { CreateTasksFormWrapper } from "./create-tasks-form-wrapper";

export const CreateTasksModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTasksModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTasksFormWrapper onCancel={close}/>
    </ResponsiveModal>
  );
};
