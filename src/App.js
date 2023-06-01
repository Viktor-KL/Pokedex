import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import AvaragePage from "./pages/AvaragePage";
import PagePagination from "./components/PagePagination/PagePagination";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");
  const [currentType, setCurrentType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offset = pokemonsPerPage * (currentPage - 1);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonsPerPage}&offset=${offset}`
        );
        const data = await response.json();

        const fetchPokemonDetails = async (url) => {
          console.log(`Fetching data for: ${url}`);
          const responseData = await fetch(url);
          const pokemonData = await responseData.json();
          return pokemonData;
        };

        const allPokemonsDataPromises = data.results.map((result) => {
          return fetchPokemonDetails(result.url);
        });

        const allPokemonsData = await Promise.all(allPokemonsDataPromises);

        setPokemonList(allPokemonsData);
        setTotalCount(data.count);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [pokemonsPerPage, currentPage]);

  const handleSearch = async (value) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value}?limit=${pokemonsPerPage}`
      );
      if (response.status === 404) {
        setError("Pokemon Not Found");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      const data = await response.json();
      setPokemonList([data]);
      setCurrentType("search");
    } catch (error) {
      console.log("Error to fetch data: ", error);
    }
  };

  const handleTypesClick = async (types) => {
    const allPokemonsData = [];

    if (types.length === 0) {
      setCurrentType("all");
    } else {
      setCurrentType("types");
    }

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
        <Search handleSearch={handleSearch} error={error} setError={setError} />
        <Pagination setPokemonsPerPage={setPokemonsPerPage} />
        <Filter handleTypesClick={handleTypesClick} />

        <Routes>
          <Route path="/" element={<AvaragePage pokemons={pokemonList} />} />
        </Routes>

        {currentType === "all" && (
          <PagePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={totalCount}
            limit={pokemonsPerPage}
          />
        )}
      </BrowserRouter>
    </main>
  );
}

export default App;
