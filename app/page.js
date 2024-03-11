import styles from "./home.module.css";
import Home from "@/components/Home/Home";

function HomePage() {
  return (
    <div className={styles.wrapper}>
      <Home />
    </div>
  );
}

export default HomePage;
