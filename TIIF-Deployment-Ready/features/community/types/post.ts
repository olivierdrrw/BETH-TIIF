export interface CommunityPost {

  id: string;

  authorId: string;

  content: string;

  likes: number;

  comments: number;

  createdAt: string;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}