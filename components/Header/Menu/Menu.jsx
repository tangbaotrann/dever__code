"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

import styles from "./Menu.module.css";
import menus, { constants, routes } from "@/routes";
import MenuItem from "./MenuItem/MenuItem";
import images, { icons } from "@/public";
import Logout from "@/components/Logout/Logout";

function Menu({ session }) {
  const pathName = usePathname();

  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const handleShowMenuMobile = () => {
    setShowMenuMobile(!showMenuMobile);
  };

  return (
    <>
      {/* Menu Normal */}
      <div className={styles.right}>
        {/* Menu links */}
        <ul className={styles.menu__link}>
          {menus.map((menu) => (
            <li key={menu.title}>
              <MenuItem menu={menu} pathName={pathName} />
            </li>
          ))}

          {/* Check user login */}
          {session?.user ? (
            <>
              {session?.user?.isAdmin && (
                <MenuItem
                  menu={{ title: constants.ADMIN, url: routes.ADMIN_URL }}
                  pathName={pathName}
                />
              )}
              <Logout />
              {/* Avatar + name */}
              <div className={styles.user}>
                <div className={styles.avatar__image}>
                  <Image
                    src={session?.user?.image || images.avatar.src}
                    alt={images.avatar.alt}
                    width={38}
                    height={38}
                  />
                </div>
                <span className={styles.username}>
                  {session?.user?.username || session?.user?.name}
                </span>
              </div>
            </>
          ) : (
            <MenuItem
              menu={{
                title: constants.LOGIN,
                url: routes.LOGIN_URL,
              }}
              pathName={pathName}
            />
          )}
        </ul>
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
              <MenuItem menu={menu} pathName={pathName} />
            </li>
          ))}

          {/* Check user login */}
          {session?.user ? (
            <>
              {session?.user?.isAdmin && (
                <MenuItem
                  menu={{ title: constants.ADMIN, url: routes.ADMIN_URL }}
                  pathName={pathName}
                />
              )}
              <Logout />
              {/* Avatar + name */}
              <div className={styles.user}>
                <div className={styles.avatar__image}>
                  <Image
                    src={session?.user?.image || images.avatar.src}
                    alt={images.avatar.alt}
                    width={38}
                    height={38}
                  />
                </div>
                <span className={styles.username}>
                  {session?.user?.username || session?.user?.name}
                </span>
              </div>
            </>
          ) : (
            <MenuItem
              menu={{
                title: constants.LOGIN,
                url: routes.LOGIN_URL,
              }}
              pathName={pathName}
            />
          )}
        </ul>
      )}
    </>
  );
}

export default Menu;
