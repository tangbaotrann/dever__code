"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./Sort.module.css";
import ActionButton from "../Button/ActionButton/ActionButton";
import { icons } from "@/public";

function Sort() {
  const [activeColor, setActiveColor] = useState(false);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  // handle sort blog with parameters
  const handleSortBlog = (type) => {
    const sort = "sort";
    const asc = "asc";
    const desc = "desc";
    const params = new URLSearchParams(searchParams);

    if (type === "asc") {
      params.set(sort, asc);
      setActiveColor(true);
    } else {
      params.set(sort, desc);
      setActiveColor(false);
    }

    replace(`${pathName}?${params}`);
  };

  return (
    <div className={styles.sort}>
      <ActionButton
        className={`${styles.btn__sort_asc} ${
          !activeColor && styles.btn__active
        }`}
        onClick={() => handleSortBlog("desc")}
      >
        <Image
          src={icons.ascending.src}
          alt={icons.ascending.alt}
          width={24}
          height={24}
        />
        Mới nhất
      </ActionButton>
      <ActionButton
        className={`${styles.btn__sort_desc} ${
          activeColor && styles.btn__active
        }`}
        onClick={() => handleSortBlog("asc")}
      >
        <Image
          src={icons.descending.src}
          alt={icons.descending.alt}
          width={24}
          height={24}
        />
        Cũ nhất
      </ActionButton>
    </div>
  );
}

export default Sort;
