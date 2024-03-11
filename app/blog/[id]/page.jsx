import styles from "./BlogPageId.module.css";

import BlogId from "@/components/Blog/[id]/BlogId";
import { fetchPostById } from "@/lib/blog/action";

async function BlogDetail({ params }) {
  const { id } = params;
  const post = await fetchPostById(id);

  return (
    <div className={styles.container}>
      <BlogId post={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}

export default BlogDetail;
