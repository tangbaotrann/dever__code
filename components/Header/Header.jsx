"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "./Header.module.css";
import menus from "@/routes";
import Menu from "./Menu/Menu";
import images, { icons } from "@/public";
import Logo from "./Logo/Logo";

function Header() {
  const pathName = usePathname();

  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const handleShowMenuMobile = () => {
    setShowMenuMobile(!showMenuMobile);
  };

  return (
    <div className={styles.container}>
      {/* Logo */}
      <Logo />

      {/* Menu normal */}
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
            <Image
              src={images.avatar.src}
              alt={images.avatar.alt}
              width={38}
              height={38}
            />
          </div>
          <span className={styles.username}>Username</span>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={styles.icon__menu_mobile}>
        {showMenuMobile ? (
          <Image
            src={icons.closeMenuMobile.src}
            alt={icons.closeMenuMobile.alt}
            width={42}
            height={42}
            onClick={handleShowMenuMobile}
          />
        ) : (
          <Image
            src={icons.menuMobile.src}
            alt={icons.menuMobile.alt}
            width={42}
            height={42}
            onClick={handleShowMenuMobile}
          />
        )}
      </div>
      {/* Show menu mobile */}
      {showMenuMobile && (
        <ul className={styles.menu__link_mobile}>
          {menus.map((menu) => (
            <li key={menu.title}>
              <Menu menu={menu} pathName={pathName} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Header;
