"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./BlogId.module.css";
import ActionButton from "@/components/Button/ActionButton/ActionButton";
import { routes } from "@/routes";
import useParseUrlImg from "@/hooks/useParseUrlImg/useParseUrlImg";
import Form from "@/components/Form/Form";
import { deleteBlog } from "@/lib/blog/action";
import Input from "@/components/Input/Input";

function BlogId({ post, session }) {
  const htmlContent = useParseUrlImg(post);

  const [state, formAction] = useFormState(deleteBlog, undefined);

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push(routes.BLOG_URL);
    }
  }, [router, state?.success]);

  return (
    <>
      {session.user.isAdmin && (
        <div className={styles.buttons}>
          <Link href={`${routes.ADMIN_URL}?update=${post._id}`}>
            <ActionButton>Cập nhật</ActionButton>
          </Link>

          <Form title="Xóa bài viết này" action={formAction}>
            <Input name="id" defaultValue={post._id} hidden />
            <ActionButton>Xóa</ActionButton>
          </Form>
        </div>
      )}
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
}

export default BlogId;
