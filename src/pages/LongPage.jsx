import React, { useState, useEffect } from "react";
import PokemonList from "../components/PokemonList/PokemonList";

export default function LongPage() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=50"
        );
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.log("Error to fetch data: ", error);
      }
    };

    fetchData();
  }, []);

  return <section>
    <PokemonList pokemonList={pokemonList} />
  </section>;
}
