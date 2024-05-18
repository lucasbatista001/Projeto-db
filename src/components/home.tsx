export const Home = ({ children }: { children: JSX.Element[] }) => {
  return (
    <div class={"flex flex-col justify-center items-center gap-4 w-2/4 h-3/4"}>
      <div
        id={"posts"}
        class={
          "h-full w-full flex flex-col items-center justify-start gap-2  p-2 overflow-auto"
        }
      >
        {children}
      </div>
      <form
        hx-post="/posts"
        hx-trigger="submit"
        hx-target="#posts"
        hx-swap="beforeend"
        class={"flex flex-col justify-center items-center gap-2 w-1/2"}
      >
        <div class={"w-full flex flex-col"}>
          <label for="title" class={"block mb-2 text-sm font-medium text-gray-900"}>
            Título:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            max={255}
            placeholder="Título do post"
            class={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"}
          />
        </div>
        <div class={"w-full flex flex-col rounded"}>
          <label for="content" class={"block mb-2 text-sm font-medium text-gray-900"}>
            Conteúdo:
          </label>
          <textarea name="content" id="content" class={"block p-2.5 w-full max-h-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"} />
        </div>
        <button
          type="submit"
          class={
            "flex p-2 w-fit bg-green-500 text-center rounded hover:opacity-[0.8] text-white"
          }
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
