import Avatar from "../../Avatar/Avatar";
import styles from "./CommentItem.module.css";

function CommentItem({ comment }) {
  return (
    <div className={styles.container}>
      <Avatar comment={comment} />

      <p className={styles.text__content}>{comment?.content}</p>
    </div>
  );
}

export default CommentItem;
