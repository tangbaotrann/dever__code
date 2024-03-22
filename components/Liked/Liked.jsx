import Image from "next/image";

import styles from "./Liked.module.css";
import { icons } from "@/public";
import BlogItem from "../Blog/BlogItem/BlogItem";
import Sort from "../Sort/Sort";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";

function Liked({ likes, count, totalPages }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Image
          src={icons.saved.src}
          alt={icons.saved.alt}
          width={42}
          height={42}
        />
        <h1>Đã thích ({likes?.length} bài viết)</h1>
      </div>

      <div className={styles.top}>
        {/* Sort */}
        <Sort />

        {/* Search */}
        <Search />
      </div>

      <div className={styles.separation}></div>

      <div className={styles.content}>
        {likes?.length > 0 ? (
          likes.map((post) => (
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
    </div>
  );
}

export default Liked;
