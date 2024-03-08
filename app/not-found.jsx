import Image from "next/image";

import { icons } from "@/public";
import GoBack from "@/components/GoBack/GoBack";

function NotFoundPage() {
  return (
    <div className="not___found_container">
      <div className="not___found_title">
        <Image
          src={icons.notFound.src}
          alt={icons.notFound.alt}
          width={62}
          height={62}
        />
        <h2 className="not___found_subtitle">Không tìm thấy trang {`:((`}</h2>
      </div>

      <GoBack />
    </div>
  );
}

export default NotFoundPage;
