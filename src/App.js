import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import AvaragePage from "./pages/AvaragePage";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonsPerPage}`
        );
        const data = await response.json();

        const allPokemonsData = [];
        for (let i = 0; i < data.results.length; i++) {
          try {
            console.log(data.results[i].url);
            const responseData = await fetch(data.results[i].url);
            const res = await responseData.json();
            allPokemonsData.push(res);
          } catch (error) {
            console.log("Error fetching Pokemon data: ", error);
          }
        }

        setPokemonList(allPokemonsData);
      } catch (error) {
        console.log("Error to fetch data: ", error);
      }
    };

    fetchData();
  }, [pokemonsPerPage]);

  const handleSearch = async (value) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value}?limit=${pokemonsPerPage}`
      );
      const data = await response.json();
      setPokemonList([data]);
    } catch (error) {
      console.log("Error to fetch data: ", error);
    }
  };

  const handleTypesClick = async (types) => {
    const allPokemonsData = [];

    for (let i = 0; i < types.length; i++) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/${types[i]}`
        );
        const data = await response.json();
        const pokemonsToParse = data.pokemon.slice(
          (currentPage - 1) * pokemonsPerPage,
          currentPage * pokemonsPerPage
        );

        for (let j = 0; j < pokemonsToParse.length; j++) {
          console.log(data.pokemon[j].pokemon.url);
          const response2 = await fetch(data.pokemon[j].pokemon.url);
          const data2 = await response2.json();

          allPokemonsData.push(data2);
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    setPokemonList(allPokemonsData);
  };

  return (
    <main className="container">
      <BrowserRouter>
        <Search handleSearch={handleSearch} />
        <Pagination setPokemonsPerPage={setPokemonsPerPage} />
        <Filter handleTypesClick={handleTypesClick} />

        <Routes>
          <Route path="/" element={<AvaragePage pokemons={pokemonList} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
