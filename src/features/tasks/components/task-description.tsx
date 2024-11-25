import { DottedSeparator } from "@/components/dotted-sep";
import { Button } from "@/components/ui/button";
import { PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";
import { Task } from "../types";
import { Textarea } from "@/components/ui/textarea";

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate({
      json: { description: value },
      param: { taskId: task.$id },
    });
  };

  return (
    <div className="p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Description</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size={"sm"}
          variant={"secondary"}
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea 
            placeholder="Add a description"
            value={value} 
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size={"sm"}
            className="ml-auto w-fit "
            onClick={handleSave}  
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div className="">
          {task.description || (
            <span className="text-muted-foreground flex items-center justify-center h-full">
              No description provided.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
