import Input from "@/components/Input/Input";
import styles from "./BlogPostTitle.module.css";

function BlogPostTitle({ onChange }) {
  return (
    <div className={styles.container}>
      <Input
        primary
        large
        borderRadius
        name="title"
        onChange={onChange}
        placeholder="Nhập tiêu đề cho bài viết..."
      />
    </div>
  );
}

export default BlogPostTitle;
