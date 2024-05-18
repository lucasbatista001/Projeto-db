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
      <textarea name="content" class={"block p-2.5 w-full max-h-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"} />
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
