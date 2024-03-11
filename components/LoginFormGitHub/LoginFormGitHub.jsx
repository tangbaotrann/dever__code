import Image from "next/image";

import styles from "./LoginFormGitHub.module.css";
import Form from "../Form/Form";
import { loginUserWithGithub } from "@/lib/actions";
import { icons } from "@/public";
import ActionButton from "../Button/ActionButton/ActionButton";

function LoginFormGitHub() {
  return (
    <Form
      title="Đăng nhập nhanh với tài khoản Github của bạn."
      action={loginUserWithGithub}
    >
      <ActionButton className={styles.button__github}>
        <Image
          src={icons.github.src}
          alt={icons.github.alt}
          width={24}
          height={24}
        />
        Đăng nhập với Github
      </ActionButton>
    </Form>
  );
}

export default LoginFormGitHub;
