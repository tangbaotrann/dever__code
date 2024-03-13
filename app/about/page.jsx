import About from "@/components/About/About";
import styles from "./About.module.css";

export const metadata = {
  title: "Giới thiệu",
  description:
    "Welcome to Dever.code About - Useful blog posts for developers, programmers web at Dever.code.",
};

function AboutPage() {
  return (
    <div className={styles.wrapper}>
      <About />
    </div>
  );
}

export default AboutPage;
