"use client";

import { useEffect, useState } from "react";

import styles from "./SlideRow.module.css";
import { slidesBottom, slidesTop } from "@/public";
import ImageItem from "./ImageItem/ImageItem";

function SlideRow({ slideTop, slideBottom }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slidesTop.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [slidesTop.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slidesBottom.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [slidesBottom.length]);

  return (
    <div className={styles.container}>
      {slideTop &&
        slidesTop.map((icon, i) => (
          <div
            key={icon.alt}
            className={` ${styles.from__top} ${
              i === index ? styles.active : ""
            }`}
          >
            <ImageItem icon={icon} />
          </div>
        ))}

      {slideBottom &&
        slidesBottom.map((icon, i) => (
          <div
            key={icon.alt}
            className={`${styles.from__bottom}  ${
              i === index ? styles.active : ""
            }`}
          >
            <ImageItem icon={icon} />
          </div>
        ))}
    </div>
  );
}

export default SlideRow;
