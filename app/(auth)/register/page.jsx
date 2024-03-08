import { auth } from "@/app/auth";

import styles from "./Register.module.css";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

async function RegisterPage() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <RegisterForm session={session} />
    </div>
  );
}

export default RegisterPage;
