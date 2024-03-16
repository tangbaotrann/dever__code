import styles from "./SectionRight.module.css";

function SectionRight() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin sẽ làm gì để giúp các bạn?</h1>

      <ul className={styles.list}>
        <li>Đăng bài.</li>
        <li>Chỉnh sửa - cập nhật bài.</li>
        <li>Xóa bài.</li>
        <li>Phản hồi trả lời cho bạn.</li>
        <li>Quản lý trang và các tác vụ khác.</li>
      </ul>
    </div>
  );
}

export default SectionRight;
