import Image from "next/image";

// import styles from "./Logout.module.css";
import { icons } from "@/public";
import Form from "../Form/Form";
import { logoutUser } from "@/lib/actions";
import ActionButton from "../Button/ActionButton/ActionButton";

function Logout() {
  return (
    <Form title="Đăng xuất tại đây." action={logoutUser}>
      <ActionButton>
        <Image
          src={icons.logout.src}
          alt={icons.logout.alt}
          width={16}
          height={16}
        />
        Đăng xuất
      </ActionButton>
    </Form>
  );
}

export default Logout;
