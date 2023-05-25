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
  const [currentPage, setCurrentPage] = useState(2);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [searchValue, setSearchValue] = useState("");

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

  let pokemonListToShow = [];

  if (searchValue.length !== 0) {
    pokemonListToShow = pokemonList.filter((item) =>
      item.name.includes(searchValue.toLowerCase())
    );
  } else {
    pokemonListToShow = pokemonList.slice(
      (currentPage - 1) * pokemonsPerPage,
      currentPage * pokemonsPerPage
    );
  }

  return (
    <main className="container">
      <BrowserRouter>
        <Search
          setPokemonList={setPokemonList}
          setSearchValue={setSearchValue}
        />
        <Pagination />
        <Filter />

        <Routes>
          <Route path="/" element={<AvaragePage />} />
          <Route path="/short_page" element={<ShortPage />} />
          <Route path="/long_page" element={<LongPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
