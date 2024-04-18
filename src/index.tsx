import { Html, html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import { Home } from "./components/home";
import { Post } from "./components/post";
import { db } from "./db";
import { formatDate } from "./utils/formatDate";

const app = new Elysia()
  .use(html())
  .decorate("db", db)
  .decorate("formatDate", formatDate)
  .get("/", async ({ db, formatDate }) => {
    const { rows } = await db.query<{
      id: number;
      title: string;
      content: string;
      created_at: Date;
    }>(`SELECT * FROM posts`);
    return (
      <Home>
        <div
          class={
            "w-2/4 h-1/2 flex flex-col items-center justify-start overflow-auto"
          }
        >
          {rows.map((post) => (
            <Post
              content={post.content}
              title={post.title}
              createdAt={formatDate(post.created_at)}
            ></Post>
          ))}
        </div>
      </Home>
    );
  })
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
