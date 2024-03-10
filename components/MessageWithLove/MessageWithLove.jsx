import styles from "./MessageWithLove.module.css";

function MessageWithLove() {
  return (
    <div className={styles.container}>
      <i className={styles.message}>
        -- From
        <b className={styles.name}>{" “Dever.code” "}</b> with love❤️ --
      </i>
    </div>
  );
}

export default MessageWithLove;
