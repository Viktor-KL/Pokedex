import React, { useState, useEffect } from "react";
import styles from './Search.module.scss'

export default function Search({ handleSearch }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <input type="text" placeholder="Search Pokemon" className={styles.search} onChange={(e) => setSearchValue(e.target.value)} />
      <button className={styles.button} onClick={() => handleSearch(searchValue)}>search</button>
    </div>
  );
}
