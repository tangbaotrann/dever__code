"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./Search.module.css";
import Input from "../Input/Input";
import { icons } from "@/public";
import useDebounce from "@/hooks/useDebounce/useDebounce";

function Search() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue, 600);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  // handle search parameters
  const handleChangeSearch = (e) => {
    const value = e.target.value;

    setSearchValue(value);
  };

  useEffect(() => {
    const q = "q";
    const params = new URLSearchParams(searchParams);

    if (debounceSearchValue) {
      params.set(q, debounceSearchValue);
    } else {
      params.delete(q);
    }

    replace(`${pathName}?${params}`);
  }, [debounceSearchValue, pathName, replace, searchParams]);

  return (
    <div className={styles.container}>
      <Image
        src={icons.search.src}
        alt={icons.search.alt}
        width={42}
        height={42}
        className={styles.icon__search}
        onClick={handleShowSearch}
      />
      {showSearch && (
        <Input
          primary
          large
          borderRadius
          name="search"
          placeholder="Nhập tiêu đề bài blog nhé..."
          className={styles.input__search}
          onChange={handleChangeSearch}
        />
      )}
    </div>
  );
}

export default Search;
