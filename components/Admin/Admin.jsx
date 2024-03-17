import dynamic from "next/dynamic";

import styles from "./Admin.module.css";
import { auth } from "@/app/auth";

const FroalaEditorCustomNoSSR = dynamic(
  () => import("./FroalaEditorCustom/FroalaEditorCustom"),
  { ssr: false }
);

async function Admin({ postUpdateId }) {
  const session = await auth();

  return (
    <div className={styles.container}>
      <FroalaEditorCustomNoSSR session={session} postUpdateId={postUpdateId} />
    </div>
  );
}

export default Admin;
