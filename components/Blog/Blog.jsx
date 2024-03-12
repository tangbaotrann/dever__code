import Image from "next/image";

import styles from "./Blog.module.css";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import BlogItem from "./BlogItem/BlogItem";
import ActionButton from "../Button/ActionButton/ActionButton";
import { icons } from "@/public";

function Blog({ posts, count, totalPages }) {
  return (
    <>
      <div className={styles.top}>
        <div className={styles.sort}>
          <ActionButton className={styles.btn__sort_mobile}>
            <Image
              src={icons.ascending.src}
              alt={icons.ascending.alt}
              width={24}
              height={24}
            />
            Mới nhất
          </ActionButton>
          <ActionButton className={styles.btn__sort_mobile}>
            <Image
              src={icons.descending.src}
              alt={icons.descending.alt}
              width={24}
              height={24}
            />
            Cũ nhất
          </ActionButton>
        </div>

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
