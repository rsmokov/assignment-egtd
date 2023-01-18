export interface UserPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type PostsResponse = UserPost[];
