import React, { useState } from "react";
import styles from './Search.module.scss'

export default function Search({ handleSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");

  const handleSearchClick = () => {
    if (searchValue.trim() === "") {
      setError("Enter a pokemon name");
      setTimeout(() => {
        setError('')
      }, 2000)
      return;
    }

    handleSearch(searchValue);
    setError("");
  };

  return (
    <div className={styles.wrapper}>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Search Pokemon"
        className={styles.search}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className={styles.button} onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}
