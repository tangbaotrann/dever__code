import Link from "next/link";
import Image from "next/image";

import styles from "./GoBack.module.css";
import { icons } from "@/public";
import { routes } from "@/routes";
import ActionButton from "../Button/ActionButton/ActionButton";

function GoBack() {
  return (
    <ActionButton>
      <Link href={routes.HOME_URL} className={styles.not___found_link}>
        Về trang chủ
        <Image
          src={icons.arrowGoBack.src}
          alt={icons.arrowGoBack.alt}
          width={24}
          height={24}
        />
      </Link>
    </ActionButton>
  );
}

export default GoBack;
