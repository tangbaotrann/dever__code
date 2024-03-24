import { useState } from "react";
import Image from "next/image";

import styles from "./Comments.module.css";
import { icons } from "@/public";
import FormInput from "./FormInput/FormInput";
import CommentItem from "./CommentItem/CommentItem";

function Comments({ post, session, comments }) {
  const [comment, setComment] = useState(false);

  // handle show comment
  const handleShowComment = () => {
    setComment(true);
  };

  // handle close comment
  const handleCloseComment = () => {
    setComment(false);
  };

  return (
    <>
      <div className={styles.like__comment_item_right}>
        {comment ? (
          <div className={styles.comment__item_right}>
            <Image
              src={icons.commented.src}
              alt={icons.commented.alt}
              width={42}
              height={42}
              className={styles.icon__comment}
              onClick={handleCloseComment}
            />
            <span className={styles.like__comment_text}>
              {comments?.length > 0 ? comments.length : 0} bình luận
            </span>
          </div>
        ) : (
          <div className={styles.comment__item_right}>
            <Image
              src={icons.comment.src}
              alt={icons.comment.alt}
              width={42}
              height={42}
              className={styles.icon__comment}
              onClick={handleShowComment}
            />
            <span className={styles.like__comment_text}>
              {comments?.length > 0 ? comments.length : 0} bình luận
            </span>
          </div>
        )}
      </div>

      {/* Show comment */}
      {comment && (
        <div className={styles.container}>
          <div className={styles.close__comment_icon}>
            <Image
              src={icons.rightArrow.src}
              alt={icons.rightArrow.alt}
              width={20}
              height={20}
              onClick={handleCloseComment}
            />
          </div>

          <h1>Bình luận</h1>

          <div className={styles.content}>
            {/* <Avatar session={session} /> */}

            <FormInput post={post} session={session} isShowComment={comment} />

            {/* map */}
            <div className={styles.comment__item}>
              {comments?.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <div key={comment._id}>
                      <CommentItem comment={comment} />
                    </div>
                  );
                })
              ) : (
                <i className={styles.text__message}>
                  -- Chưa có bình luận nào --
                </i>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Comments;
