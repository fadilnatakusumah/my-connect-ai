import ContentWrapper from "~/components/content-wrapper";
import CreatePost from "~/components/create-post";

async function CreatePostPage() {
  return (
    <ContentWrapper title="Create a Post">
      <CreatePost />
    </ContentWrapper>
  );
}

export default CreatePostPage;
