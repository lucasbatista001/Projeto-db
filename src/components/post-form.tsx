import { PostSchema } from "../types/post";

export const PostForm = ({ id, title, content }: PostSchema) => (
  <div
    id={`post${id}`}
    class={
      "flex flex-row items-center justify-between p-4 w-full rounded shadow bg-zinc-50 divide-x divide-zinc-500"
    }
  >
    <form
      hx-trigger={`click from:#updatePost${id}`}
      hx-patch={`/posts/${id}`}
      hx-target={`#post${id}`}
      hx-swap="outerHTML"
      class={"flex flex-row w-4/5 justify-between gap-8"}
    >
      <div class="w-full flex flex-col gap-2 ">
        <label for={"title"} class={"font-bold text-lg"}>
          Título:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          class={"rounded border-2"}
        />
      </div>
      <div class={"w-full flex flex-col gap-2 "}>
        <label for="content" class={"font-bold text-lg"}>
          Conteúdo:
        </label>
        <textarea
          name="content"
          id={"content"}
          class={"rounded border-2 h-full w-full"}
        >
          {content}
        </textarea>
      </div>
    </form>
    <div class={"flex flex-col justify-center pl-4 items-center gap-4"}>
      <i
        id={`updatePost${id}`}
        class="fi fi-sr-check-circle flex justify-center items-center rounded bg-green-500 p-2 hover:cursor-pointer"
      ></i>
      <i
        hx-delete={`/posts/${id}`}
        hx-target={`#post${id}`}
        hx-swap="outerHTML"
        class="fi fi-br-cross flex justify-center items-center rounded bg-red-400 p-2 hover:cursor-pointer"
      ></i>
    </div>
  </div>
);
