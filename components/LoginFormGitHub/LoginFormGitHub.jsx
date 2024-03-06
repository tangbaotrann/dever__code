import Image from "next/image";

import styles from "./LoginFormGitHub.module.css";
import Button from "../Button/Button";
import Form from "../Form/Form";
import { loginUserWithGithub } from "@/lib/actions";
import { icons } from "@/public";

function LoginFormGitHub() {
  return (
    <Form
      title="Đăng nhập nhanh với tài khoản Github của bạn."
      action={loginUserWithGithub}
    >
      <Button primary large borderRadius className={styles.button__github}>
        <Image
          src={icons.github.src}
          alt={icons.github.alt}
          width={24}
          height={24}
        />
        Đăng nhập bằng Github
      </Button>
    </Form>
  );
}

export default LoginFormGitHub;
