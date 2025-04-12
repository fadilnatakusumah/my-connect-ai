"use client";

import { Edit, Search, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ModalDialog } from "./modal-dialog";

import { toast } from "sonner";
import { DeletePost, type Post } from "~/services/api-posts";
import { usePostStore } from "~/store/post";

function ListPosts({ posts: initialPosts }: { posts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const { posts, setPosts, selectedPost, selectPost } = usePostStore();

  const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts, setPosts]);

  async function submitDeletePost() {
    try {
      startTransition(async () => {
        await DeletePost(selectedPost!.id!);
        toast.success("Success deleting post", {
          classNames: {
            icon: "text-green-500",
          },
        });
        selectPost(null);
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error(String(error));
    }
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-2 sticky">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search a post..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/posts/create-a-post">Create a Post</Link>
        </Button>
      </div>

      <div className="rounded-md border overflow-y-auto">
        <Table style={{ scrollbarWidth: "thin" }}>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Post</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell className="max-w-52 text-ellipsis overflow-hidden">
                    {post.title}
                  </TableCell>
                  <TableCell className="whitespace-break-spaces">
                    {post.body}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="cursor-pointer text-red-700"
                      onClick={() => {
                        selectPost(post);
                      }}
                      variant="ghost"
                      size={"icon"}
                    >
                      <Trash />
                    </Button>
                    <Button
                      className="cursor-pointer"
                      onClick={() => {}}
                      variant="ghost"
                      size={"icon"}
                    >
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <ModalDialog
          open={!!selectedPost}
          title="Delete Post"
          saveTitle="Delete"
          onSubmit={submitDeletePost}
          onCancel={() => selectPost(null)}
          isSubmitting={isPending}
        >
          <p>Are you sure you want to delete this post? #{selectedPost?.id}</p>
        </ModalDialog>
      </div>
    </div>
  );
}

export default ListPosts;
