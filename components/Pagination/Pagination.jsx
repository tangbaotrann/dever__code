"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./Pagination.module.css";
import ActionButton from "../Button/ActionButton/ActionButton";
import { icons } from "@/public";
import { DEFAULT_NUM_PAGINATION } from "@/utils/constants";

function Pagination({ count, totalPages }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const currentPage = searchParams.get("page") || 1;
  const prevPage = parseInt(currentPage) - 1;
  const nextPage = parseInt(currentPage) + 1;
  const ITEM_PER_PAGE = DEFAULT_NUM_PAGINATION;

  const hasPrevPage = ITEM_PER_PAGE * prevPage > 0;
  const hasNextPage = ITEM_PER_PAGE * prevPage + ITEM_PER_PAGE < count;

  // handle click
  const handleClickChangePage = (type) => {
    const params = new URLSearchParams(searchParams);

    type === "prev__page"
      ? params.set("page", prevPage)
      : params.set("page", nextPage);

    replace(`${pathName}?${params}`);
  };

  return (
    <div className={styles.container}>
      <ActionButton
        onClick={() => handleClickChangePage("prev__page")}
        className={`${!hasPrevPage && `${styles.disabled}`}`}
        disabled={!hasPrevPage}
      >
        <Image
          src={icons.prevPage.src}
          alt={icons.prevPage.alt}
          width={18}
          height={18}
        />
        Trước
      </ActionButton>
      <i>
        {currentPage}/ {totalPages}
      </i>
      <ActionButton
        onClick={() => handleClickChangePage("next__page")}
        className={`${!hasNextPage && `${styles.disabled}`}`}
        disabled={!hasNextPage}
      >
        Sau
        <Image
          src={icons.nextPage.src}
          alt={icons.nextPage.alt}
          width={18}
          height={18}
        />
      </ActionButton>
    </div>
  );
}

export default Pagination;
