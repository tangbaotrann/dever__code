"use client";

import Image from "next/image";

import { icons } from "@/public";
import GoBack from "@/components/GoBack/GoBack";

function ErrorPage() {
  return (
    <div className="error__container">
      <div className="error__title">
        <Image
          src={icons.error.src}
          alt={icons.error.alt}
          width={62}
          height={62}
        />

        <h2 className="error__subtitle">Đã xảy ra lỗi {`:((`}</h2>
      </div>

      <GoBack />
    </div>
  );
}

export default ErrorPage;
