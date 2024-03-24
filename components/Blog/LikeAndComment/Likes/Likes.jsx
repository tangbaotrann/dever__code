"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./Likes.module.css";
import Form from "@/components/Form/Form";
import ActionButton from "@/components/Button/ActionButton/ActionButton";
import { icons } from "@/public";
import { addLike, unLike } from "@/lib/like/action";

function Likes({ post, session }) {
  const [like, setLike] = useState(false);

  // handle like
  const handleLike = async () => {
    try {
      await addLike(post, session);
      setLike(true);
    } catch (err) {
      console.log(err);
    }
  };

  // handle unlike
  const handleUnLike = async () => {
    try {
      await unLike(post, session);
      setLike(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.like__comment_item_left}>
      {like ||
      // Check active liked
      post.likes.find((liked) => liked.email.includes(session.user.email)) ? (
        <div className={styles.like__item_left}>
          <Form title="Bỏ thích" action={handleUnLike}>
            <ActionButton className={styles.button__like}>
              <Image
                src={icons.liked.src}
                alt={icons.liked.alt}
                width={42}
                height={42}
                className={styles.icon__like}
              />
            </ActionButton>
          </Form>
          <span className={styles.like__comment_text}>
            Đã thích ({post.likes.length} người thích)
          </span>
        </div>
      ) : (
        <div className={styles.like__item_left}>
          <Form title="Thích" action={handleLike}>
            <ActionButton className={styles.button__like}>
              <Image
                src={icons.like.src}
                alt={icons.like.alt}
                width={42}
                height={42}
                className={styles.icon__like}
              />
            </ActionButton>
          </Form>
          <span className={styles.like__comment_text}>
            {post.likes.length} người thích
          </span>
        </div>
      )}
    </div>
  );
}

export default Likes;
