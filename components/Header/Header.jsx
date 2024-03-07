import styles from "./Header.module.css";
import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import { auth } from "@/app/auth";

async function Header() {
  const session = await auth();

  console.log("session", session);

  return (
    <div className={styles.container}>
      {/* Logo */}
      <Logo />

      {/* Menu */}
      <Menu session={session} />
    </div>
  );
}

export default Header;
