import styles from "./Home.module.css";
import SectionLeft from "./SectionLeft/SectionLeft";
import SectionRight from "./SectionRight/SectionRight";

function Home() {
  return (
    <div className={styles.container}>
      {/* Section 1 */}
      <div className={styles.main}>
        <div className={styles.section__left}>
          <SectionLeft />
        </div>
        <div className={styles.section__right}>
          <SectionRight />
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles.main}></div>
    </div>
  );
}

export default Home;
