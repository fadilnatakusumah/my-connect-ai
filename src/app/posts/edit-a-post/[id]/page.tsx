import ContentWrapper from "~/components/content-wrapper";
import CreateUpdatePost from "~/components/create-update-post";

async function CreatePostPage({ params }: { params: Promise<{ id: string }> }) {
  const urlParams = await params;

  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${urlParams.id}`
  ).then((res) => res.json());

  return (
    <ContentWrapper title="Edit a Post">
      <CreateUpdatePost post={post} />
    </ContentWrapper>
  );
}

export default CreatePostPage;
