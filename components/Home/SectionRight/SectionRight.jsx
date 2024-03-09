import styles from "./SectionRight.module.css";
import SlideRow from "./SlideRow/SlideRow";

function SectionRight() {
  return (
    <div className={styles.container}>
      <SlideRow slideTop={true} />
      <SlideRow slideBottom={true} />
    </div>
  );
}

export default SectionRight;
