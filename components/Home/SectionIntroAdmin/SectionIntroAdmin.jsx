import styles from "./SectionIntroAdmin.module.css";
import SectionLeft from "./SectionLeft/SectionLeft";
import SectionRight from "./SectionRight/SectionRight";

function SectionIntroAdmin() {
  return (
    <div className={styles.container}>
      {/* Section left */}
      <div className={styles.section__left}>
        <SectionLeft />
      </div>

      {/* Section right */}
      <div className={styles.section__right}>
        <SectionRight />
      </div>
    </div>
  );
}

export default SectionIntroAdmin;
