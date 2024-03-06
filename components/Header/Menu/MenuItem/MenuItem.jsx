import Link from "next/link";

import styles from "./MenuItem.module.css";

function MenuItem({ menu, pathName }) {
  return (
    <Link
      href={menu.url}
      className={`${styles.menu__item} ${
        pathName === menu.url ? styles.active : null
      }`}
    >
      {menu.title}
    </Link>
  );
}

export default MenuItem;
