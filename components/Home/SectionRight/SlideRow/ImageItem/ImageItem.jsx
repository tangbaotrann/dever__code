import Image from "next/image";

import styles from "./ImageItem.module.css";

function ImageItem({ icon }) {
  return <Image src={icon.src} alt={icon.alt} width={62} height={62} />;
}

export default ImageItem;
