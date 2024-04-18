export const Post = ({
  title,
  content,
  createdAt,
}: {
  title: string;
  content: string;
  createdAt: string;
}) => (
  <div
    class={
      "flex flex-row items-center justify-between p-4 w-full rounded shadow bg-zinc-50 divide-x divide-zinc-500"
    }
  >
    <div class={"flex flex-col gap-4 w-4/5"}>
      <div class={"flex flex-row justify-between items-center"}>
        <h1 class={"text-xl font-bold"}>{title}</h1>
        <p class={"text-zinc-500"}>{createdAt}</p>
      </div>
      <p class={"italic"}>{content}</p>
    </div>
    <div class={"flex flex-col justify-center pl-4 items-center gap-4"}>
      <i class="fi fi-sr-pen-clip flex justify-center items-center rounded bg-sky-500 p-2 hover:cursor-pointer"></i>
      <i class="fi fi-br-cross flex justify-center items-center rounded bg-red-400 p-2 hover:cursor-pointer"></i>
    </div>
  </div>
);
