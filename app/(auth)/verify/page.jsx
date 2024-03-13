import { auth } from "@/app/auth";

import styles from "./verify.module.css";
import VerifyForm from "@/components/VerifyForm/VerifyForm";

export const metadata = {
  title: "Xác thực",
  description:
    "Welcome to Dever.code Verify - Useful blog posts for developers, programmers web at Dever.code.",
};

async function VerifyPage() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <VerifyForm session={session} />
    </div>
  );
}

export default VerifyPage;
