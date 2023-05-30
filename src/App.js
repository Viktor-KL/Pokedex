import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import ShortPage from "./pages/ShortPage";
import AvaragePage from "./pages/AvaragePage";
import LongPage from "./pages/LongPage";

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
        `https://pokeapi.co/api/v2/pokemon/${value}`
      );
      const data = await response.json();
      setPokemonList([data]);
    } catch (error) {
      console.log("Error to fetch data: ", error);
    }
  };

  let pokemonListToShow = pokemonList.slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  return (
    <main className="container">
      <BrowserRouter>
        <Search handleSearch={handleSearch} />
        <Pagination setPokemonsPerPage={setPokemonsPerPage} />
        <Filter />

        <Routes>
          <Route
            path="/"
            element={<AvaragePage pokemons={pokemonListToShow} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
