import Image from "next/image";

// import styles from "./LoginFormGoogle.module.css";
import { icons } from "@/public";
import Form from "../Form/Form";
import { loginUserWithGoogle } from "@/lib/actions";
import ActionButton from "../Button/ActionButton/ActionButton";

function LoginFormGoogle() {
  return (
    <Form
      title="Đăng nhập nhanh với tài khoản Github của bạn."
      action={loginUserWithGoogle}
    >
      <ActionButton>
        <Image
          src={icons.google.src}
          alt={icons.google.alt}
          width={24}
          height={24}
        />
        Đăng nhập với Google
      </ActionButton>
    </Form>
  );
}

export default LoginFormGoogle;
