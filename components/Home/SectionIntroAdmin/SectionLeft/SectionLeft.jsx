"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./SectionLeft.module.css";
import { slidesIntroAdmin } from "@/public";

function SectionLeft() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slidesIntroAdmin.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Giao diện của Admin có gì?</h1>

      <div className={styles.slides}>
        {slidesIntroAdmin.map((slide, i) => (
          <div
            key={slide.alt}
            className={`${styles.slide__item} ${
              i === index ? styles.active : ""
            }`}
          >
            <div className={styles.slide__image}>
              <Image
                src={slide.src}
                alt={slide.alt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%", borderRadius: "12px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionLeft;
