"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

import Form from "@/components/Form/Form";
import styles from "./FormInput.module.css";
import Textarea from "@/components/Textarea/Textarea";
import ActionButton from "@/components/Button/ActionButton/ActionButton";
import { addComment } from "@/lib/comment/action";
import Input from "@/components/Input/Input";

function FormInput({ post, session, isShowComment }) {
  const [comment, setComment] = useState("");

  const commentRef = useRef(null);

  const [state, formAction] = useFormState(addComment, undefined);

  // when show comment -> focus input
  useEffect(() => {
    isShowComment && commentRef?.current?.focus();
  }, [isShowComment]);

  // handle change input
  const handleChangeComment = (e) => {
    const value = e.target.value;

    setComment(value);
  };

  // handle submit form
  const handleSubmit = (formData) => {
    formAction(formData);

    setComment("");
    commentRef?.current?.focus();
  };

  return (
    <Form title="Gửi bình luận" action={handleSubmit} className={styles.form}>
      <Textarea
        primary
        large
        borderRadius
        name="content"
        rows={4}
        placeholder="Nhập bình luận..."
        value={comment}
        myRef={commentRef}
        onChange={handleChangeComment}
      />

      <Input name="email" defaultValue={session.user.email} hidden />
      <Input name="postId" defaultValue={post._id} hidden />

      <ActionButton>Bình luận</ActionButton>
    </Form>
  );
}

export default FormInput;
