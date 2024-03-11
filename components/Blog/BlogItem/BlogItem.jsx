import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import styles from "./BlogItem.module.css";
import images, { icons } from "@/public";
import { routes } from "@/routes";

function BlogItem({ blog }) {
  return (
    <>
      <div className={styles.top}>
        <span className={styles.top__date}>
          {dayjs(blog.createdAt).format("DD/MM/YYYY - HH:mm a")}
        </span>
        <Image
          src={images.avatar.src}
          alt={images.avatar.alt}
          width={36}
          height={36}
          className={styles.top__avatar}
        />
      </div>

      <div className={styles.image__blog}>
        <Image
          src={images.avatar.src}
          alt={icons.blog.alt}
          width={320}
          height={240}
          className={styles.image__content}
        />
      </div>

      <div className={styles.content__blog}>
        {/* <h1
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: blog.desc }}
        ></h1> */}
        <Link
          href={`${routes.BLOG_URL}/${blog._id}`}
          className={styles.read__more}
        >
          Xem thêm...
        </Link>
      </div>
    </>
  );
}

export default BlogItem;
