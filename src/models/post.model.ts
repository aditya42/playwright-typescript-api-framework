export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostPayload {
  userId: number;
  title: string;
  body: string;
}
