import React, { useState, useEffect } from 'react'

import PokemonCard from './../PokemonCard/PokemonCard'
import styles from './PokemonList.module.scss'

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
          const data = await response.json();
          setPokemonList(data.results);
          console.log(data)
        } catch (error) {
          console.log("Error to fetch data: ", error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className={styles.list}>

        <input type="text" />
        {pokemonList.map((item, key) => (
        <PokemonCard key={key} url={item.url} />
      ))}
    </div>
  )
}
