import { auth } from "@/app/auth";

import styles from "./verify.module.css";
import VerifyForm from "@/components/VerifyForm/VerifyForm";

async function VerifyPage() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <VerifyForm session={session} />
    </div>
  );
}

export default VerifyPage;
