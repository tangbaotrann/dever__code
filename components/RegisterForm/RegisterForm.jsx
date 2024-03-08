"use client";

import Link from "next/link";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import styles from "./RegisterForm.module.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { routes } from "@/routes";
import { registerUser } from "@/lib/actions";
import ActionButton from "../Button/ActionButton/ActionButton";

function RegisterForm({ session }) {
  const [state, formAction] = useFormState(registerUser, undefined);

  const router = useRouter();

  // user already login -> push to home page
  useEffect(() => {
    session?.user && router.push(routes.HOME_URL);
  }, [router, session?.user]);

  useEffect(() => {
    state?.success && router.push(routes.VERIFY_URL);
  }, [router, state?.success]);

  return (
    <Form
      title="Thông tin đăng ký tài khoản của bạn."
      action={formAction}
      className={styles.form}
    >
      <h1 className={styles.title}>Đăng ký</h1>

      <span className={styles.message__failure}>
        {state?.error && state?.error}
      </span>

      <Input
        type="text"
        name="username"
        placeholder="Nhập tên của bạn..."
        primary
        large
        borderRadius
      />
      <Input
        type="email"
        name="email"
        placeholder="Nhập email của bạn..."
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
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Nhập lại mật khẩu của bạn..."
        primary
        large
        borderRadius
      />
      <Input type="radio" name="isActive" defaultValue={false} hidden={true} />

      <ActionButton>Đăng ký</ActionButton>

      <span className={styles.login}>
        Bạn đã có tài khoản?
        <Link href={routes.LOGIN_URL} className={styles.login__link}>
          Đăng nhập ngay
        </Link>
      </span>
    </Form>
  );
}

export default RegisterForm;
