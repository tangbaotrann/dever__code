import styles from "./BlogPage.module.css";
import { fetchPosts } from "@/lib/data";
import Blog from "@/components/Blog/Blog";

async function BlogPage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const sort = searchParams?.sort || "desc";

  const { count, posts, totalPages } = await fetchPosts(q, page, sort);

  return (
    <div className={styles.container}>
      <Blog posts={posts} count={count} totalPages={totalPages} />
    </div>
  );
}

export default BlogPage;
