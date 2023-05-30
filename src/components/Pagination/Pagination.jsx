import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Pagination.module.scss";

export default function Pagination({setPokemonsPerPage}) {
  return (
    <section className={styles.wrapper}>
      {/* <NavLink to="/short_page"> */}
        <div className={styles.item} onClick={() => setPokemonsPerPage(10)}>
        10

        </div>
        <div className={styles.item} onClick={() => setPokemonsPerPage(20)}>
        20

        </div>
        <div className={styles.item} onClick={() => setPokemonsPerPage(50)}>
        50

        </div>
      {/* </NavLink> */}
      {/* <NavLink className={styles.item} to="/">
        20
      </NavLink>
      <NavLink className={styles.item} to="/long_page">
        50
      </NavLink>       */}
    </section>
  );
}
