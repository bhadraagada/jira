import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middlware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { WorkspaceSchema } from "../schemas";

const app = new Hono().post(
  "/",
  zValidator("json", WorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { name } = c.req.valid("json");

    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      ID.unique(),
      {
        name,
        userId: user.$id,
      }
    );

    return c.json({
      data: workspace,
    });
  }
);

export default app;
