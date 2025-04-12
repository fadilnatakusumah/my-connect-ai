export interface Post {
  id?: string;
  title: string;
  userId?: string;
  body: string;
}
export async function SubmitPost(data: Post) {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      data,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
}

export async function DeletePost(id: string) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
}
