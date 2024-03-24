import styles from "./LikeAndComment.module.css";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";

function LikeAndComment({ post, session, comments }) {
  return (
    <div className={styles.like__comment}>
      {/* Like */}
      <Likes post={post} session={session} />

      {/* Comments */}
      <Comments post={post} session={session} comments={comments} />
    </div>
  );
}

export default LikeAndComment;
