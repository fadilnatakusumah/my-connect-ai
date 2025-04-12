import { create } from "zustand";

import { Post } from "~/services/api-posts";

interface PostStore {
  posts: Post[];
  selectedPost: Post | null;

  setPosts: (posts: Post[]) => void;
  selectPost: (post: Post | null) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  selectedPost: null,

  selectPost: (post) => set({ selectedPost: post }),
  setPosts: (posts) => set({ posts }),
}));
