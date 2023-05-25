import React from "react";
import styles from "./Filter.module.scss";

export default function Filter({ pokemonList, setFilteredPokemonList }) {
  const typesArray = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ];

  return (
    <section className={styles.wrapper}>
      {typesArray.map((item, key) => (
        <div className={styles.type} key={key}>
          {item}
        </div>
      ))}
    </section>
  );
}
