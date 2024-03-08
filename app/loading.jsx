import { icons } from "@/public";
import Image from "next/image";

function Loading() {
  return (
    <div className="loading__container">
      <Image
        src={icons.loading.src}
        alt={icons.loading.alt}
        width={42}
        height={42}
        className="loading__full_page"
      />
    </div>
  );
}

export default Loading;
