"use client";

import { DottedSeparator } from "@/components/dotted-sep";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useGetTasks } from "../api/use-get-task";
import { useCreateTasksModal } from "../hooks/use-create-tasks-modal";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";

const TaskViewSwitcher = () => {
  const [{
    status,
    assigneeId,
    projectId,
    dueDate
  }] = useTaskFilters();

  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    status,
    assigneeId,
    dueDate
  });
  const { open } = useCreateTasksModal();

  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="w-full h-8 lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="w-full h-8 lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="w-full h-8 lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size={"sm"} className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        {/* Add filters */}
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="flex border rounded-lg justify-center items-center w-full h-[200px] p-5">

            <Loader className="size-6 animate-spin text-muted-foreground"/>
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              Data Table
              {JSON.stringify(tasks)}
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              Data Kanban
              {JSON.stringify(tasks)}
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Data Calendar
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
