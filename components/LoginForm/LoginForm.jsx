"use client";

import { useFormState } from "react-dom";
import Link from "next/link";

import styles from "./LoginForm.module.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { loginUserWithCredentials } from "@/lib/actions";
import { routes } from "@/routes";
import ActionButton from "../Button/ActionButton/ActionButton";

function LoginForm() {
  const [state, formAction] = useFormState(loginUserWithCredentials, undefined);

  return (
    <Form
      title="Thông tin đăng nhập của bạn"
      action={formAction}
      className={styles.form}
    >
      <h1 className={styles.title}>Đăng nhập</h1>

      <span className={styles.message__failure}>
        {state?.error && state?.error}
      </span>

      <Input
        type="text"
        name="username"
        placeholder="Nhập tài khoản của bạn..."
        primary
        large
        borderRadius
      />
      <Input
        type="password"
        name="password"
        placeholder="Nhập mật khẩu của bạn..."
        primary
        large
        borderRadius
      />

      <ActionButton>Đăng nhập</ActionButton>

      <span className={styles.register}>
        Bạn chưa có tài khoản?
        <Link href={routes.REGISTER_URL} className={styles.register__link}>
          Đăng ký ngay
        </Link>
      </span>
    </Form>
  );
}

export default LoginForm;
