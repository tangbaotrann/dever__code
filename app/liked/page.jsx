import styles from "./LikedPage.module.css";
import Liked from "@/components/Liked/Liked";
import { auth } from "../auth";
import { likedBlogPostByEmailUser } from "@/lib/blog/action";

async function LikedPage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const sort = searchParams?.sort || "desc";

  const session = await auth();
  const { liked, count, totalPages } = await likedBlogPostByEmailUser(
    session.user.email,
    q,
    page,
    sort
  );

  return (
    <div className={styles.container}>
      <Liked likes={liked} count={count} totalPages={totalPages} />
    </div>
  );
}

export default LikedPage;
