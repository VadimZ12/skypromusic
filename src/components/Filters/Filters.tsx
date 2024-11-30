"use client";

import { useCallback, useState } from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "./Filters.module.css";
import { filters } from "./data";
import { useAppSelector } from "@/hooks";

export default function Filters() {
  const selectedAuthors = useAppSelector(
    (store) => store.playlist.filterOptions.author
  );
  const selectedGenres = useAppSelector(
    (store) => store.playlist.filterOptions.genre
  );
  const selectedOrder = useAppSelector(
    (store) => store.playlist.filterOptions.order
  );
  const { author, genre } = useAppSelector(
    (state) => state.playlist.filterOptions
  );
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <FilterItem
        selected={selectedAuthors}
        isOpened={activeFilter === filters[0].title}
        handleFilterClick={handleFilterClick}
        title={filters[0].title}
        value={filters[0].value}
        optionList={author}
        counter={selectedAuthors.length}
      />
      <FilterItem
        selected={selectedGenres}
        isOpened={activeFilter === filters[1].title}
        handleFilterClick={handleFilterClick}
        title={filters[1].title}
        value={filters[1].value}
        optionList={genre}
        counter={selectedGenres.length}
      />
      <FilterItem
        isOpened={activeFilter === filters[2].title}
        handleFilterClick={handleFilterClick}
        title={filters[2].title}
        value={filters[2].value}
        selected={selectedOrder}
      />
    </div>
  );
}