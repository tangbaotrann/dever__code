"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "./Header.module.css";
import menus from "@/routes";
import Menu from "./Menu/Menu";
import images from "@/public";
import Logo from "./Logo/Logo";

function Header() {
  const pathName = usePathname();

  return (
    <div className={styles.container}>
      {/* Logo */}
      <Logo />

      <div className={styles.right}>
        {/* Menu links */}
        <ul className={styles.menu__link}>
          {menus.map((menu) => (
            <li key={menu.title}>
              <Menu menu={menu} pathName={pathName} />
            </li>
          ))}
        </ul>

        {/* Avatar + name */}
        <div className={styles.user}>
          <div className={styles.avatar__image}>
            <Image src={images.avatar.src} alt={images.avatar.alt} fill />
          </div>
          <span className={styles.username}>Username</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
