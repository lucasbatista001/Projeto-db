import { PostSchema } from "./post";

export type CommentSchema = {
  id: number;
  content: string;
  created_at: Date;
  post: PostSchema;
};
