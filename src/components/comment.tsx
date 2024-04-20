import { CommentSchema } from "../types/comment";
import { formatDate } from "../utils/formatDate";

export const Comment = ({
  id,
  content,
  created_at,
}: Omit<CommentSchema, "post">) => (
  <div
    id={`comment${id}`}
    class={
      "flex flex-row p-2 bg-zinc-50 rounded items-center justify-between w-full"
    }
  >
    <span>{content}</span>
    <div class="flex items-center gap-4">
      <span>{formatDate(created_at)}</span>
      <i
        hx-delete={`/comments/${id}`}
        hx-target={`#comment${id}`}
        hx-swap="outerHTML"
        class="fi fi-br-cross flex justify-center items-center rounded bg-red-400 p-2 hover:cursor-pointer"
      ></i>
    </div>
  </div>
);
