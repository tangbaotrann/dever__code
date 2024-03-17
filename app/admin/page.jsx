import styles from "./admin.module.css";
import { fetchPostById } from "@/lib/blog/action";
import Admin from "@/components/Admin/Admin";

export const metadata = {
  title: "Admin",
  description:
    "Welcome to Dever.code Admin - Useful blog posts for developers, programmers web at Dever.code.",
};

async function AdminPage({ searchParams }) {
  const updateId = searchParams?.update || "";

  const postUpdateId = await fetchPostById(updateId);

  return (
    <div className={styles.container}>
      <Admin
        postUpdateId={
          postUpdateId ? JSON.parse(JSON.stringify(postUpdateId)) : postUpdateId
        }
      />
    </div>
  );
}

export default AdminPage;
