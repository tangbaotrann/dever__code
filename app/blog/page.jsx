import styles from "./BlogPage.module.css";
import { fetchPosts } from "@/lib/data";
import Blog from "@/components/Blog/Blog";

async function BlogPage() {
  const blogs = await fetchPosts();

  return (
    <div className={styles.container}>
      <Blog blogs={blogs} />
    </div>
  );
}

export default BlogPage;
