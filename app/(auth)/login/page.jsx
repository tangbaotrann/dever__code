import styles from "./Login.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";
import LoginFormGitHub from "@/components/LoginFormGitHub/LoginFormGitHub";
import LoginFormGoogle from "@/components/LoginFormGoogle/LoginFormGoogle";

export const metadata = {
  title: "Đăng nhập",
  description:
    "Welcome to Dever.code Login - Useful blog posts for developers, programmers web at Dever.code.",
};

function LoginPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Đăng nhập nhanh</h1>
      {/* Login with Github */}
      <div className={styles.type__login}>
        <LoginFormGoogle /> |
        <LoginFormGitHub />
      </div>

      <span>-- HOẶC --</span>

      {/* Login with credentials */}
      <LoginForm />
    </div>
  );
}

export default LoginPage;
