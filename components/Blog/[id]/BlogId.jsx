"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import styles from "./BlogId.module.css";
import ActionButton from "@/components/Button/ActionButton/ActionButton";
import { routes } from "@/routes";
import useParseUrlImg from "@/hooks/useParseUrlImg/useParseUrlImg";
import Form from "@/components/Form/Form";
import { deleteBlog } from "@/lib/blog/action";
import Input from "@/components/Input/Input";
import { icons } from "@/public";
import LikeAndComment from "../LikeAndComment/LikeAndComment";

function BlogId({ post, session, comments }) {
  const htmlContent = useParseUrlImg(post);

  const [state, formAction] = useFormState(deleteBlog, undefined);

  const router = useRouter();

  // handle delete blog post
  const handleDeleteBlogPost = async (formData) => {
    const isConfirm = confirm("Bạn có muốn xóa bài viết này không?");

    if (isConfirm) {
      formAction(formData);
    }
  };

  useEffect(() => {
    if (state?.success) {
      router.push(routes.BLOG_URL);
    }
  }, [router, state?.success]);

  return (
    <>
      {/* Only admin */}
      {session.user.isAdmin && (
        <div className={styles.buttons}>
          <Link href={`${routes.ADMIN_URL}?update=${post._id}`}>
            <ActionButton>
              <Image
                src={icons.update.src}
                alt={icons.update.alt}
                width={22}
                height={22}
              />
              Cập nhật
            </ActionButton>
          </Link>

          <Form title="Xóa bài viết này" action={handleDeleteBlogPost}>
            <Input name="id" defaultValue={post._id} hidden />
            <ActionButton className={styles.button__delete}>
              <Image
                src={icons.delete.src}
                alt={icons.delete.alt}
                width={22}
                height={22}
              />
              Xóa bài
            </ActionButton>
          </Form>
        </div>
      )}

      <div className={styles.separation}></div>

      <div className={styles.content}>
        {/* Admin and User */}
        <div className={styles.content__left}>
          <LikeAndComment post={post} session={session} comments={comments} />
        </div>

        <div className={styles.content__right}>
          <h1>{post?.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </>
  );
}

export default BlogId;
