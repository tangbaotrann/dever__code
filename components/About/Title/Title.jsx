import Image from "next/image";

import styles from "./Title.module.css";
import { icons } from "@/public";

function Title({ children, className, icon = false }) {
  return (
    <div className={`${className} ${styles.main__item}`}>
      {icon && (
        <Image
          src={icons.arrowGoBack.src}
          alt={icons.arrowGoBack.alt}
          width={24}
          height={24}
        />
      )}
      <h1 className={styles.title__text}>{children}</h1>
    </div>
  );
}

export default Title;
