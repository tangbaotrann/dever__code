"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./VerifyForm.module.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import ActionButton from "../Button/ActionButton/ActionButton";
import { verifyUser } from "@/lib/actions";
import { routes } from "@/routes";

function VerifyForm({ session }) {
  const [state, formAction] = useFormState(verifyUser, undefined);

  const router = useRouter();

  // user already login -> push to home page
  useEffect(() => {
    session?.user && router.push(routes.HOME_URL);
  }, [router, session?.user]);

  useEffect(() => {
    state?.success && router.push(routes.LOGIN_URL);
  }, [router, state?.success]);

  return (
    <Form
      title="Thông tin xác thực của bạn"
      action={formAction}
      className={styles.form}
    >
      <h1 className={styles.title}>Xác thực tài khoản</h1>
      <span className={styles.message__failure}>
        {state?.error && state?.error}
      </span>

      <Input
        type="email"
        name="email"
        placeholder="Nhập lại email của bạn..."
        primary
        large
        borderRadius
      />
      <i className={styles.message__note}>
        <b className={styles.message_lbl}>* Lưu ý:</b> Mã xác thực được gửi qua
        email mà bạn đăng ký trước đó. Vui lòng không chia sẻ mã cho bất kì ai
        nhé!
      </i>
      <Input
        type="text"
        name="numberVerify"
        placeholder="Nhập mã xác thực của bạn..."
        primary
        large
        borderRadius
      />

      <ActionButton>Xác thực</ActionButton>

      <div className={styles.footer}>
        <span className={styles.login}>
          <Link href={routes.REGISTER_URL} className={styles.login__link}>
            Quay lại
          </Link>
        </span>

        <span className={styles.login}>
          <Link href={routes.LOGIN_URL} className={styles.login__link}>
            Đăng nhập
          </Link>
        </span>
      </div>
    </Form>
  );
}

export default VerifyForm;
