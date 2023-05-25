import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Pagination.module.scss";

export default function Pagination() {
  return (
    <section className={styles.wrapper}>
      <NavLink className={styles.item} to="/short_page">
        10
      </NavLink>
      <NavLink className={styles.item} to="/">
        20
      </NavLink>
      <NavLink className={styles.item} to="/long_page">
        50
      </NavLink>      
    </section>
  );
}
