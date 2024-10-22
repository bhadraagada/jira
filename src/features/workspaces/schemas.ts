import {z} from "zod";

export const WorkspaceSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
})