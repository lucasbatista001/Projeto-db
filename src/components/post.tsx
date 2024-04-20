export const Post = ({
  id,
  title,
  content,
  createdAt,
  showSidebar = true,
}: {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  showSidebar?: boolean;
}) => (
  <div
    id={`post${id}`}
    class={
      "flex flex-row items-center justify-between p-4 w-full rounded shadow bg-zinc-50 divide-x divide-zinc-500"
    }
  >
    <div
      class={`flex flex-col ${
        showSidebar ? "w-4/5" : "w-full"
      } gap-4 cursor-pointer`}
      hx-get={`/posts/${id}`}
      hx-target="#main"
    >
      <div class={`flex flex-row justify-between items-center`}>
        <h1 class={"text-xl font-bold"}>{title}</h1>
        <p class={"text-zinc-500"}>{createdAt}</p>
      </div>
      <p class={"italic"}>{content}</p>
    </div>
    {showSidebar && (
      <div
        class={"flex flex-col justify-center pl-4 items-center gap-4"}
        hx-trigger="submit"
      >
        <i
          hx-target={`#post${id}`}
          hx-get={`/edit/${id}`}
          hx-swap="outerHTML"
          class="fi fi-sr-pen-clip flex justify-center items-center rounded bg-sky-500 p-2 hover:cursor-pointer"
        ></i>
        <i
          hx-delete={`/posts/${id}`}
          hx-target={`#post${id}`}
          hx-swap="outerHTML"
          class="fi fi-br-cross flex justify-center items-center rounded bg-red-400 p-2 hover:cursor-pointer"
        ></i>
      </div>
    )}
  </div>
);
