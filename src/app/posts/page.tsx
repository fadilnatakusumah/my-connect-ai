import ContentWrapper from "~/components/content-wrapper";
import ListPosts from "~/components/list-posts";

async function Posts() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );

  return (
    <ContentWrapper title="Posts">
      <ListPosts posts={posts} />;
    </ContentWrapper>
  );
}

export default Posts;
