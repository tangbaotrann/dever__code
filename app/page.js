// import { fetchComments, fetchLikes } from "@/lib/data";
import styles from "./home.module.css";
import Home from "@/components/Home/Home";

// async
function HomePage() {
  // const comments = await fetchComments();
  // const likes = await fetchLikes();

  // console.log(comments, likes);

  return (
    <div className={styles.wrapper}>
      <Home />
    </div>
  );
}

export default HomePage;
