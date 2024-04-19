import { Html, html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import { Base } from "./components/base";
import { Home } from "./components/home";
import { Post } from "./components/post";
import { PostForm } from "./components/post-form";
import { db } from "./db";
import { PostSchema } from "./types/post";
import { formatDate } from "./utils/formatDate";

const app = new Elysia()
  .use(html())
  .decorate("db", db)
  .decorate("formatDate", formatDate)
  .get("/", async ({ db, formatDate }) => {
    const { rows } = await db.query<PostSchema>(`SELECT * FROM posts`);
    return (
      <Base>
        <Home>
          {rows.map((post) => (
            <Post
              id={post.id}
              content={post.content}
              title={post.title}
              createdAt={formatDate(post.created_at)}
            ></Post>
          ))}
        </Home>
      </Base>
    );
  })
  .get("/edit/:id", async ({ db, params, error }) => {
    try {
      const { rows } = await db.query<PostSchema>(
        `SELECT * FROM posts WHERE id = $1`,
        [params.id]
      );
      const post = rows[0];

      return <PostForm {...post} />;
    } catch (e) {
      console.error(e);
      return error(500, "Internal Server Error");
    }
  })
  .post(
    "/posts",
    async ({ db, body, error, formatDate }) => {
      try {
        await db.query(
          `INSERT INTO posts (title, content) 
          VALUES ($1, $2)`,
          [body.title, body.content]
        );
        const { rows } = await db.query<PostSchema>(
          `SELECT * FROM posts ORDER BY id DESC LIMIT 1`
        );

        const { id, created_at, content, title } = rows[0];

        return (
          <Post
            id={id}
            content={content}
            createdAt={formatDate(created_at)}
            title={title}
          ></Post>
        );
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
