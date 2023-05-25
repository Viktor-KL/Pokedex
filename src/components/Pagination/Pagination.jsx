import React from "react";
import styles from "./Pagination.module.scss";

export default function Pagination({ setPokemonsPerPage, setCurrentPage }) {
  const handleButtonClick = (count, page) => {
    setPokemonsPerPage(count);
    setCurrentPage(page)
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.item} onClick={() => handleButtonClick(10, 1)}>
        10
      </div>
      <div className={styles.item} onClick={() => handleButtonClick(20, 2)}>
        20
      </div>
      <div className={styles.item} onClick={() => handleButtonClick(50, 3)}>
        50
      </div>
    </section>
  );
}
