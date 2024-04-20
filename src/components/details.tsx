export const Details = ({
  children,
  postId,
}: {
  children: JSX.Element[];
  postId: number;
}) => (
  <div class={"flex flex-col items-center justify-between p-4 w-3/4 h-3/4"}>
    {children}
    <form
      hx-post={`/comments/${postId}`}
      hx-swap="beforeend"
      hx-target="#comments"
      class={"w-full flex items-center justify-between"}
    >
      <textarea name="content" class={"w-5/6 h-10 p-2 rounded"} />
      <button
        type="submit"
        class={
          "flex p-2 w-fit bg-green-500 text-center rounded hover:opacity-[0.8]"
        }
      >
        Comentar
      </button>
    </form>
  </div>
);
