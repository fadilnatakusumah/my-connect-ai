import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ListPosts from "../components/list-posts";
import { type Post, DeletePost } from "../services/api-posts";
import { usePostStore } from "../store/post";

jest.mock("~/services/api-posts", () => ({
  DeletePost: jest.fn(),
}));

jest.mock("~/store/post", () => ({
  usePostStore: jest.fn(() => ({
    posts: [],
    setPosts: jest.fn(),
    selectedPost: null,
    selectPost: jest.fn(),
  })),
}));

describe("ListPosts", () => {
  const posts: Post[] = [
    { id: 1, title: "Post 1", body: "This is post 1" },
    { id: 2, title: "Post 2", body: "This is post 2" },
  ];

  it("renders the posts table", () => {
    const { getByText } = render(<ListPosts posts={posts} />);

    waitFor(() => {
      expect(getByText("ID")).toBeInTheDocument();
      expect(getByText("Title")).toBeInTheDocument();
      expect(getByText("Post")).toBeInTheDocument();
      expect(getByText("1")).toBeInTheDocument();
      expect(getByText("Post 1")).toBeInTheDocument();
      expect(getByText("This is post 1")).toBeInTheDocument();
    });
  });

  it("filters posts by search term", () => {
    const { getByText, getByPlaceholderText } = render(
      <ListPosts posts={posts} />
    );

    waitFor(() => {
      const searchInput = getByPlaceholderText("Search a post...");
      fireEvent.change(searchInput, { target: { value: "post 1" } });
      expect(getByText("1")).toBeInTheDocument();
      expect(getByText("Post 1")).toBeInTheDocument();
      expect(getByText("This is post 1")).toBeInTheDocument();
      expect(getByText("2")).not.toBeInTheDocument();
      expect(getByText("Post 2")).not.toBeInTheDocument();
      expect(getByText("This is post 2")).not.toBeInTheDocument();
    });
  });

  it("deletes a post", async () => {
    const { getByText, getByRole } = render(<ListPosts posts={posts} />);
    waitFor(async () => {
      const deleteButton = getByRole("button", { name: "Delete" });
      fireEvent.click(deleteButton);
      await waitFor(() =>
        expect(usePostStore().selectPost).toHaveBeenCalledTimes(1)
      );
      await waitFor(() => expect(usePostStore().selectedPost).toBe(posts[0]));
      const modal = getByText("Delete Post");
      expect(modal).toBeInTheDocument();
      const confirmButton = getByRole("button", { name: "Delete" });
      fireEvent.click(confirmButton);
      await waitFor(() => expect(DeletePost).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(DeletePost).toHaveBeenCalledWith(posts[0].id));
    });
  });

  it("cancels deletion", async () => {
    const { getByText, getByRole } = render(<ListPosts posts={posts} />);
    waitFor(async () => {
      const deleteButton = getByRole("button", { name: "Delete" });
      fireEvent.click(deleteButton);
      await waitFor(() =>
        expect(usePostStore().selectPost).toHaveBeenCalledTimes(1)
      );
      await waitFor(() => expect(usePostStore().selectedPost).toBe(posts[0]));
      const modal = getByText("Delete Post");
      expect(modal).toBeInTheDocument();
      const cancelButton = getByRole("button", { name: "Cancel" });
      fireEvent.click(cancelButton);
      await waitFor(() =>
        expect(usePostStore().selectPost).toHaveBeenCalledTimes(2)
      );
      await waitFor(() => expect(usePostStore().selectedPost).toBeNull());
    });
  });
});
