import Pagination from "../Pagination/Pagination";
import styles from "./Blog.module.css";
import BlogItem from "./BlogItem/BlogItem";

function Blog({ posts, count, totalPages }) {
  return (
    <>
      <div className={styles.container}>
        {posts.map((post) => (
          <div className={styles.blog__item} key={post._id}>
            <BlogItem post={post} />
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination count={count} totalPages={totalPages} />
    </>
  );
}

export default Blog;
