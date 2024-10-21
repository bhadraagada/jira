import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middlware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { ID } from "node-appwrite";
import { AUTH_COOKIE } from "../constants";
import { LoginSchema, SignUpSchema } from "../schemas";

const app = new Hono()
  .get("/current", sessionMiddleware, async (c) => {
    const user = c.get("user");

    return c.json({
      data: user,
    });
  })

  .post("/login", zValidator("json", LoginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    // console.log({ email, password });
    return c.json({ success: true });
  })

  .post("/signup", zValidator("json", SignUpSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    // console.log({ name, email, password });
    return c.json({ success: true });
  })

  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");
    await account.deleteSession("current");

    deleteCookie(c, AUTH_COOKIE);

    return c.json({ success: true });
  });
export default app;
