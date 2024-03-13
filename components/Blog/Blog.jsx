import styles from "./Blog.module.css";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import BlogItem from "./BlogItem/BlogItem";
import Sort from "../Sort/Sort";

function Blog({ posts, count, totalPages }) {
  return (
    <>
      <div className={styles.top}>
        {/* Sort */}
        <Sort />

        {/* Search */}
        <Search />
      </div>

      <div className={styles.container}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className={styles.blog__item} key={post._id}>
              <BlogItem post={post} />
            </div>
          ))
        ) : (
          <i className={styles.message__no_blog}>
            -- Không tìm thấy bài viết nào --
          </i>
        )}
      </div>
      {/* Pagination */}
      <Pagination count={count} totalPages={totalPages} />
    </>
  );
}

export default Blog;
