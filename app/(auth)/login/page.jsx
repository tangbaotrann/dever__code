import styles from "./Login.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";
import LoginFormGitHub from "@/components/LoginFormGitHub/LoginFormGitHub";

function LoginPage() {
  return (
    <div className={styles.container}>
      {/* Login with Github */}
      <LoginFormGitHub />

      <span>-- HOẶC --</span>

      {/* Login with credentials */}
      <LoginForm />
    </div>
  );
}

export default LoginPage;
