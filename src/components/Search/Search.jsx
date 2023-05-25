import React, { useState, useEffect } from "react";
import styles from './Search.module.scss'

export default function Search({  setSearchValue}) {
  return (
    <div>
      <input type="text" placeholder="Search Pokemon" className={styles.search} onChange={(e) => setSearchValue(e.target.value)} />
    </div>
  );
}
