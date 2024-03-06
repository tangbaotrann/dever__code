import Link from "next/link";

import styles from "./Footer.module.css";
import Logo from "../Header/Logo/Logo";

function Footer() {
  return (
    <div className={styles.container}>
      <Logo />

      <div className={styles.content}>
        <div className={styles.footer}>
          <span className={styles.title}>Giới thiệu</span>

          <div className={styles.info}>
            <div className={`${styles.info__item} ${styles.intro}`}>
              <span className={styles.info__item_value}>
                Phát triển bởi mình (Tăng Bảo Trấn) vào năm 2024, là blog cá
                nhân chia sẻ kiến thức về lập trình IT, các lỗi gặp phải cũng
                như các solutions cho các lỗi đó. Giúp mọi người level up skill
                của bản thân.
              </span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.title}>Liên hệ</span>

          <div className={styles.info}>
            <div className={styles.info__item}>
              <span className={styles.info__item_label}>Email: </span>
              <span className={styles.info__item_value}>
                tangbaotrann@gmail.com
              </span>
            </div>

            <div className={styles.info__item}>
              <span className={styles.info__item_label}>Sđt: </span>
              <span className={styles.info__item_value}>+84-325676569</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.title}>Mạng xã hội</span>

          <div className={styles.info}>
            <div className={styles.info__item}>
              <span className={styles.info__item_label}>Facebook: </span>
              <a href="https://www.facebook.com/trann.tangbao/" target="_blank">
                <span className={styles.info__item_value}>Tăng Bảo Trấnn</span>
              </a>
            </div>

            <div className={styles.info__item}>
              <span className={styles.info__item_label}>Tiktok: </span>
              <a
                href="https://www.tiktok.com/@_tbtcodeofficial"
                target="_blank"
              >
                <span className={styles.info__item_value}>
                  _tbtcodeofficial
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.title}>Tham khảo tôi</span>

          <div className={styles.info}>
            <div className={styles.info__item}>
              <span className={styles.info__item_label}>Github: </span>
              <a
                href="https://github.com/tangbaotrann?tab=repositories"
                target="_blank"
              >
                <span className={styles.info__item_value}>
                  baotrann - tangbaotrann
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
