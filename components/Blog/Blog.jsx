import styles from "./Blog.module.css";
import BlogItem from "./BlogItem/BlogItem";

function Blog({ blogs }) {
  return (
    <div className={styles.container}>
      {blogs.map((blog) => (
        <div className={styles.blog__item} key={blog._id}>
          <BlogItem blog={blog} />
        </div>
      ))}
    </div>
  );
}

export default Blog;
