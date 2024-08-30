import { trackType } from "@/types";
import styles from "./FilterItem.module.css";
import classNames from "classnames";
import { order } from "../data";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilters } from "@/store/features/playlistSlice";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  optionList?: string[];
  selected?: string[] | string;
  toggleSelected?: (item: string) => void;
  counter?: number | null;
};

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpened,
  optionList = [],
  selected,
  counter = 0,
}: FilterItemType) {
  const dispatch = useAppDispatch();
  const tracksData = useAppSelector((state) => state.playlist.initialTracks)
  const getFilterList = () => {
    if (value !== "order") {
      const array = new Set(
        tracksData?.map((track: trackType) => track[value]) || []
      );
      return Array.from(array);
    }
    return order;
  };

  const toggleFilter = (item: string) => {
    if (value === "order") {
      dispatch(setFilters({ order: item }));
      return;
    }
    dispatch(
      setFilters({
        [value]: optionList.includes(item)
          ? optionList.filter((el) => el !== item)
          : [...optionList, item],
      })
    );
  };

  getFilterList();
  return (
    <div className={styles.wrapper}>
      {counter !== 0 && <span className={styles.counter}>{counter}</span>}
      <div
        onClick={() => handleFilterClick(title)}
        className={!isOpened? classNames(styles.filterButton, styles.BtnText) : classNames(styles.filterButtonActive, styles.BtnTextActive)}
      >
        {title}
      </div>
      {isOpened && (
        <ul className={styles.filterList}>
          {getFilterList().map((item) => {
            const activeClass = selected?.includes(item)
              ? styles.listActive
              : "";
            return (
              <li
                onClick={() => {
                  if (toggleFilter) toggleFilter(item);
                }}
                className={classNames(styles.filterItem, activeClass)}
                key={item}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}