import { auth } from "@/app/auth";
import styles from "./BlogPageId.module.css";

import BlogId from "@/components/Blog/[id]/BlogId";
import { fetchPostById } from "@/lib/blog/action";
import { fetchCommentsByBlogPostId } from "@/lib/comment/action";

export const metadata = {
  title: "Chi tiết Blog",
  description:
    "Welcome to Dever.code Blog Details - Useful blog posts for developers, programmers web at Dever.code.",
};

async function BlogDetail({ params }) {
  const { id } = params;
  const post = await fetchPostById(id);
  const comments = await fetchCommentsByBlogPostId(post);

  const session = await auth();

  return (
    <div className={styles.container}>
      <BlogId
        post={JSON.parse(JSON.stringify(post))}
        session={JSON.parse(JSON.stringify(session))}
        comments={JSON.parse(JSON.stringify(comments))}
      />
    </div>
  );
}

export default BlogDetail;
