import React, { useState, useEffect } from "react";
import styles from "./PokemonCard.module.scss";

export default function PokemonCard({ pokemonData }) {
  const [pokemonDetails, setPokemonDetails] = useState(false);

  const { name, sprites, types, stats } = pokemonData;

  const handleMouseEnter = () => {
    setPokemonDetails(true);
  };

  const handleMouseLeave = () => {
    setPokemonDetails(false);
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={sprites.front_default} alt={name} />
      <h3>{name}</h3>

      {pokemonDetails && (
        <div className={styles.details}>
          <p className={styles.tag}>
            # {types.map((type) => type.type.name).join(", ")}
          </p>
          <ul>
            {stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
