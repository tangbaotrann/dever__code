import Image from "next/image";

import styles from "./Blog.module.css";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import BlogItem from "./BlogItem/BlogItem";
import Sort from "../Sort/Sort";
import { icons } from "@/public";

function Blog({ posts, count, totalPages }) {
  return (
    <>
      <div className={styles.title}>
        <Image
          src={icons.blogging.src}
          alt={icons.blogging.alt}
          width={42}
          height={42}
        />
        <h1>Đã có ({posts?.length} bài viết)</h1>
      </div>

      <div className={styles.top}>
        {/* Sort */}
        <Sort />

        {/* Search */}
        <Search />
      </div>

      <div className={styles.separation}></div>

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
