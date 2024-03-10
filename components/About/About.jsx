import Image from "next/image";

import styles from "./About.module.css";
import Description from "./Description/Description";
import Title from "./Title/Title";
import { answers } from "@/utils/constants";
import { icons } from "@/public";
import MessageWithLove from "../MessageWithLove/MessageWithLove";

function About() {
  return (
    <div className={styles.container}>
      <Title className={styles.title__qa}>
        <Image
          src={icons.QandA.src}
          alt={icons.QandA.alt}
          width={42}
          height={42}
          className={styles.image__qa}
        />
        Những điều bạn nên biết về
        <b className={styles.title__name}>{" “Dever.code” "}</b>:
      </Title>

      <div className={styles.main}>
        <Title icon>
          Tại sao lại là
          <b className={styles.title__name}>{" “Dever.code” "}</b> mà không phải
          là một tên khác?
        </Title>

        <Description>{answers.answer__1.description}</Description>
      </div>

      <div className={styles.main}>
        <Title icon>Được phát triển bởi ai?</Title>

        <Description>{answers.answer__2.description}</Description>
      </div>

      <div className={styles.main}>
        <Title icon>Tại sao lại phát triển em nó?</Title>

        <Description>{answers.answer__3.description}</Description>
      </div>

      <div className={styles.main}>
        <Title icon>Mục đích của trang Web?</Title>

        <Description>{answers.answer__4.description}</Description>
      </div>

      <div className={styles.main}>
        <Title icon>Bạn sẽ học được gì?</Title>

        <Description>{answers.answer__5.description}</Description>
      </div>

      <MessageWithLove />
    </div>
  );
}

export default About;
