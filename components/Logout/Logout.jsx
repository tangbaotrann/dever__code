import Image from "next/image";

import styles from "./Logout.module.css";
import Button from "../Button/Button";
import { icons } from "@/public";
import Form from "../Form/Form";
import { logoutUser } from "@/lib/actions";

function Logout() {
  return (
    <Form title="Đăng xuất tại đây." action={logoutUser}>
      <Button primary large borderRadius className={styles.button__logout}>
        <Image
          src={icons.logout.src}
          alt={icons.logout.alt}
          width={16}
          height={16}
        />
        Đăng xuất
      </Button>
    </Form>
  );
}

export default Logout;
