import Image from "next/image";
import { useFormState } from "react-dom";

import styles from "./BlogPostForm.module.css";
import ActionButton from "@/components/Button/ActionButton/ActionButton";
import Form from "@/components/Form/Form";
import { icons } from "@/public";

function BlogPostForm({ handlePostBlog }) {
  const [state, formAction] = useFormState(handlePostBlog, undefined);

  return (
    <Form title="Đăng bài" action={formAction} className={styles.form}>
      <ActionButton>
        <Image
          src={icons.blog.src}
          alt={icons.blog.alt}
          width={28}
          height={28}
        />
        Đăng bài
      </ActionButton>
    </Form>
  );
}

export default BlogPostForm;
