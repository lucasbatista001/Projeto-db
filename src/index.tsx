import { Html, html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import { Base } from "./components/base";
import { Comment } from "./components/comment";
import { Details } from "./components/details";
import { Home } from "./components/home";
import { Post } from "./components/post";
import { PostForm } from "./components/post-form";
import { db } from "./db";
import { CommentSchema } from "./types/comment";
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
  .patch(
    "/posts/:id",
    async ({ db, body, params, error }) => {
      try {
        await db.query(
          `UPDATE posts 
        SET title = $1, content = $2 
        WHERE id = $3`,
          [body.title, body.content, params.id]
        );

        const { rows } = await db.query<PostSchema>(
          `SELECT * FROM posts WHERE id = $1`,
          [params.id]
        );

        const post = rows[0];

        return (
          <Post
            id={post.id}
            content={post.content}
            title={post.title}
            createdAt={formatDate(post.created_at)}
          />
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
  .delete("/posts/:id", async ({ db, params, error }) => {
    try {
      await db.query(`DELETE FROM posts WHERE id = $1`, [params.id]);
    } catch (e) {
      console.error(e);
      return error(500, "Internal Server Error");
    }
  })
  .get("/posts/:id", async ({ db, params, error }) => {
    try {
      const { rows: postRows } = await db.query<PostSchema>(
        `SELECT *
        FROM posts p
        WHERE p.id = $1`,
        [params.id]
      );
      const post = postRows[0];
      const { rows: commentRows } = await db.query<CommentSchema>(
        `SELECT content, created_at, id FROM comments WHERE post_id = $1`,
        [params.id]
      );
      post.comments = commentRows;

      return (
        <Details postId={post.id}>
          <Post
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={formatDate(post.created_at)}
            showSidebar={false}
          ></Post>
          <div id={"comments"} class={"w-full h-2/4 flex flex-col gap-4"}>
            {post.comments.map((comment) => (
              <Comment {...comment}></Comment>
            ))}
          </div>
        </Details>
      );
    } catch (e) {
      console.error(e);
      return error(500, "Internal Server Error");
    }
  })
  .post(
    "/comments/:postId",
    async ({ db, body, params, error }) => {
      try {
        await db.query(
          `INSERT INTO comments (content, post_id) 
        VALUES ($1, $2)`,
          [body.content, params.postId]
        );

        const { rows } = await db.query<CommentSchema>(
          `SELECT * FROM comments WHERE post_id = $1 ORDER BY id DESC LIMIT 1`,
          [params.postId]
        );

        const comment = rows[0];

        return <Comment {...comment} />;
      } catch (e) {
        console.error(e);
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  )
  .delete("/comments/:id", async ({ db, params, error }) => {
    try {
      await db.query(`DELETE FROM comments WHERE id = $1`, [params.id]);
    } catch (e) {
      console.error(e);
      return error(500, "Internal Server Error");
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
