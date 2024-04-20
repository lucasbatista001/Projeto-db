export type PostSchema = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  comments: CommentSchema[];
};
