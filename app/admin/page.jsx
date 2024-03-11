import styles from "./admin.module.css";
import Admin from "@/components/Admin/Admin";

function AdminPage() {
  return (
    <div className={styles.container}>
      <Admin />
    </div>
  );
}

export default AdminPage;
