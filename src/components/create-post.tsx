"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "./ui/textarea";

import { useRouter } from "next/navigation";
import { SubmitPost } from "~/services/api-posts";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
  userId: z.any().nullable(),
});

export default function CreatePost() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: 1, // default id of user
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await SubmitPost(data);
      toast.success("Success submitting post", {
        classNames: {
          icon: "text-green-500",
        },
      });
      form.reset();
      router.push("/posts");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error(String(error));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your title post" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your post here" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
            </FormItem>
          )}
        />
        <div className="text-right flex justify-end gap-2">
          <Button variant={"outline"}>
            <Link href={"/posts"}>Back</Link>
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current border-r-2"></span>
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
