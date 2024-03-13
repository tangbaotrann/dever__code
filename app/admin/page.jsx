import styles from "./admin.module.css";
import Admin from "@/components/Admin/Admin";

export const metadata = {
  title: "Admin",
  description:
    "Welcome to Dever.code Admin - Useful blog posts for developers, programmers web at Dever.code.",
};

function AdminPage() {
  return (
    <div className={styles.container}>
      <Admin />
    </div>
  );
}

export default AdminPage;
