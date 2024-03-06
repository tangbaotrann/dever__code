import Link from "next/link";

import styles from "./Logo.module.css";
import { router } from "@/routes";

function Logo() {
  return (
    <Link href={router.HOME_URL}>
      <h1 className={styles.logo}>Dever.code</h1>
    </Link>
  );
}

export default Logo;
