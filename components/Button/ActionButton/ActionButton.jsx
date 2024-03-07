"use client";

import { useFormStatus } from "react-dom";
import Image from "next/image";

import styles from "./ActionButton.module.css";
import Button from "../Button";
import { icons } from "@/public";

function ActionButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <Button
      primary
      large
      borderRadius
      className={`${styles.button__github} ${
        pending && styles.button__disabled
      }`}
      type="submit"
      disabled={pending}
    >
      {pending && (
        <Image
          src={icons.loading.src}
          alt={icons.loading.alt}
          width={24}
          height={24}
          className={styles.loading}
        />
      )}

      {children}
    </Button>
  );
}

export default ActionButton;