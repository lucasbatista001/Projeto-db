import { Html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import { db } from "./db";

const app = new Elysia()
  .decorate("db", db)
  .post(
    "/posts",
    async ({ db, body, error, set }) => {
      try {
        const result = await db.query(
          `INSERT INTO posts (title, content) 
          VALUES ($1, $2)`,
          [body.title, body.content]
        );

        console.log(result.rows);
        set.redirect = "/posts/1";
      } catch (e) {
        console.error(e);
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
      }),
    }
  )
  .get(
    "posts/:id",
    async ({ db, params, error }) => {
      try {
        const post = await db.query(
          `SELECT p.*, c.* 
        FROM posts p
        INNER JOIN comments c
          ON c.post_id = p.id 
        WHERE id = $1`,
          [params.id]
        );
        console.log(post);
        return <div>{post}</div>;
      } catch (e) {
        console.error(e);
        return error(500, "Internal Server Error");
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
