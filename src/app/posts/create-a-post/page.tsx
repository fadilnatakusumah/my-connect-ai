import ContentWrapper from "~/components/content-wrapper";
import CreateUpdatePost from "~/components/create-update-post";

async function CreatePostPage() {
  return (
    <ContentWrapper title="Create a Post">
      <CreateUpdatePost />
    </ContentWrapper>
  );
}

export default CreatePostPage;
