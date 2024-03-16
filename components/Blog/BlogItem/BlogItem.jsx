import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import styles from "./BlogItem.module.css";
import images, { icons } from "@/public";
import { routes } from "@/routes";
import ActionButton from "@/components/Button/ActionButton/ActionButton";

function BlogItem({ post }) {
  return (
    <>
      <div className={styles.top}>
        <span className={styles.top__date}>
          {dayjs(post.createdAt).format("DD/MM/YYYY - HH:mm a")}
        </span>
        <Image
          src={images.bkAvatar.src}
          alt={images.bkAvatar.alt}
          width={36}
          height={36}
          className={styles.top__avatar}
        />
      </div>

      <div className={styles.image__blog}>
        <Image
          src={post?.images[0] || images.avatar.src}
          alt={icons.blog.alt}
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "100%", height: "160px", borderRadius: "6px" }}
          className={styles.image__content}
        />
      </div>

      <div className={styles.content__blog}>
        <h1 className={styles.text__title}>{post?.title}</h1>
        <Link
          href={`${routes.BLOG_URL}/${post._id}`}
          className={styles.read__more}
        >
          <ActionButton className={styles.btn__more_mobile}>
            Xem thêm...
          </ActionButton>
        </Link>
      </div>
    </>
  );
}

export default BlogItem;
