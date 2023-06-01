import React from "react";
import styles from "./PagePagination.module.scss";

export default function PagePagination({
  currentPage,
  setCurrentPage,
  totalCount,
  limit,
}) {
  const totalPagesCount = Math.ceil(totalCount / limit);
  const maxDisplayedPages = 10;
  const pageButtons = [];

  let startIndex = Math.max(currentPage - Math.floor(maxDisplayedPages / 2), 1);
  let endIndex = Math.min(startIndex + maxDisplayedPages - 1, totalPagesCount);

  if (endIndex - startIndex < maxDisplayedPages - 1) {
    startIndex = Math.max(endIndex - maxDisplayedPages + 1, 1);
  }

  for (let i = startIndex; i <= endIndex; i++) {
    pageButtons.push(
      <button
        className={styles.button}
        style={currentPage === i ? { background: "red" } : {}}
        onClick={() => setCurrentPage(i)}
        key={i}
      >
        {i}
      </button>
    );
  }

  return <section className={styles.wrapper}>{pageButtons}</section>;
}
