import styles from "./Description.module.css";

function Description({ children }) {
  return <span className={styles.desc}>{children}</span>;
}

export default Description;
