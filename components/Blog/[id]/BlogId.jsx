"use client";

import Link from "next/link";

import styles from "./BlogId.module.css";
import ActionButton from "@/components/Button/ActionButton/ActionButton";
import { routes } from "@/routes";
import useParseUrlImg from "@/hooks/useParseUrlImg/useParseUrlImg";

function BlogId({ post, session }) {
  const htmlContent = useParseUrlImg(post);

  return (
    <>
      {session.user.isAdmin && (
        <div className={styles.buttons}>
          <Link href={`${routes.ADMIN_URL}?update=${post._id}`}>
            <ActionButton>Cập nhật</ActionButton>
          </Link>
          <ActionButton>Xóa</ActionButton>
        </div>
      )}
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
}

export default BlogId;
