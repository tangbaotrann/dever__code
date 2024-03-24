import Image from "next/image";
import dayjs from "dayjs";

import styles from "./Avatar.module.css";
import images from "@/public";
import customUsername from "@/utils/customUsername";

function Avatar({ comment }) {
  return (
    <div className={styles.container}>
      <Image
        src={comment?.userId?.image || images.avatar.src}
        alt={images.avatar.alt}
        width={32}
        height={32}
        className={styles.avatar__image}
      />

      <div className={styles.info}>
        <h3 className={styles.username}>{customUsername(comment?.email)}</h3>
        <p className={styles.time}>
          {dayjs(comment.createdAt).format("DD/MM/YYYY - hh:mm a")}
        </p>
      </div>
    </div>
  );
}

export default Avatar;
