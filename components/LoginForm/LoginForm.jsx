"use client";

import { useFormState } from "react-dom";

import styles from "./LoginForm.module.css";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { loginUserWithCredentials } from "@/lib/actions";

function LoginForm() {
  const [state, formAction] = useFormState(loginUserWithCredentials, undefined);

  //   console.log("state", state);

  return (
    <Form
      title="Thông tin đăng nhập của bạn"
      action={formAction}
      className={styles.form}
    >
      <h1 className={styles.title}>Đăng nhập</h1>

      <Input
        name="username"
        placeholder="Nhập tên của bạn..."
        primary
        large
        borderRadius
      />
      <Input
        name="password"
        placeholder="Nhập mật khẩu của bạn..."
        primary
        large
        borderRadius
      />

      <Button primary large borderRadius>
        Đăng nhập
      </Button>
    </Form>
  );
}

export default LoginForm;
