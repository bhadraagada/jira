import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  status: z.nativeEnum(TaskStatus, { required_error: "Status is required" }),
  workspaceId: z.string().trim().min(1, { message: "Workspace is required" }),
  dueDate: z.coerce.date(),
  assigneeID: z.string().trim().min(1, { message: "Assignee is required" }),
  description: z.string().trim().optional(),
})