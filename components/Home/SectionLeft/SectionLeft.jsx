import Link from "next/link";
import Image from "next/image";

import styles from "./SectionLeft.module.css";
import { routes } from "@/routes";
import ActionButton from "@/components/Button/ActionButton/ActionButton";
import constants from "@/utils/constants";
import { icons } from "@/public";

function SectionLeft() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Wow, chào mừng bạn đến với
        <b className={styles.title__name}> Dever.code</b>
      </h1>

      <span className={styles.desc}>
        Mình tên
        <Link href={routes.ABOUT_URL}>
          <b className={styles.desc__name_admin}> Tăng Bảo Trấn </b>
        </Link>
        và đây là blog cá nhân của mình. Mình muốn chia sẻ các kiến thực lập
        trình Web đến các bạn qua các bài blog do chính mình tổng hợp và soạn
        nhé. Các bài viết về các lỗi cũng như các giải pháp khắc phục lỗi một
        cách chi tiết nhất để giúp các bạn mới bắt đầu tiếp cận học cũng như là
        tất cả mọi người trên
        <b className={styles.desc__name_logo}> Dever.code</b> cùng tham khảo.
        Nào, đọc đến đây được rồi, bắt đầu học thôi nào {":>"}
      </span>

      <div className={styles.buttons}>
        <Link href={routes.BLOG_URL}>
          <ActionButton>
            <Image
              src={icons.blog.src}
              alt={icons.blog.alt}
              width={26}
              height={26}
            />
            Blog
          </ActionButton>
        </Link>
        <Link href={constants.facebook} target="_blank">
          <ActionButton>
            <Image
              src={icons.messenger.src}
              alt={icons.messenger.alt}
              width={26}
              height={26}
            />
            Liên hệ Facebook
          </ActionButton>
        </Link>
      </div>
    </div>
  );
}

export default SectionLeft;
