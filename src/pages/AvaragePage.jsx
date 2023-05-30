import React, { useState, useEffect } from "react";
import PokemonList from "../components/PokemonList/PokemonList";

export default function AvaragePage({pokemons}) {
  return <section>
    <PokemonList pokemonList={pokemons} />
  </section>;
}
