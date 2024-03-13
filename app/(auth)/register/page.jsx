import { auth } from "@/app/auth";

import styles from "./Register.module.css";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

export const metadata = {
  title: "Đăng ký",
  description:
    "Welcome to Dever.code Register - Useful blog posts for developers, programmers web at Dever.code.",
};

async function RegisterPage() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <RegisterForm session={session} />
    </div>
  );
}

export default RegisterPage;
