"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./LikeAndComment.module.css";
import { icons } from "@/public";
import Form from "@/components/Form/Form";
import ActionButton from "@/components/Button/ActionButton/ActionButton";
import { addLike, unLike } from "@/lib/like/action";

function LikeAndComment({ post, session }) {
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState(false);

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

  // handle comment
  const handleClickComment = () => {
    setComment(!comment);
  };

  return (
    <div className={styles.like__comment}>
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

      <div className={styles.like__comment_item_right}>
        {comment ? (
          <div className={styles.comment__item_right}>
            <Image
              src={icons.commented.src}
              alt={icons.commented.alt}
              width={42}
              height={42}
              className={styles.icon__comment}
              onClick={handleClickComment}
            />
            <span className={styles.like__comment_text}>Bình luận (2k)</span>
          </div>
        ) : (
          <div className={styles.comment__item_right}>
            <Image
              src={icons.comment.src}
              alt={icons.comment.alt}
              width={42}
              height={42}
              className={styles.icon__comment}
              onClick={handleClickComment}
            />
            <span className={styles.like__comment_text}>2k</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikeAndComment;
