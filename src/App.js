import { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import Search from "./components/Search/Search";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=1281"
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
      <Search setPokemonList={setPokemonList} setSearchValue={setSearchValue} />
      <Pagination pokemonsPerPage={pokemonsPerPage} setPokemonsPerPage={setPokemonsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <Filter />
      <PokemonList
        pokemonList={pokemonListToShow}
        setPokemonList={setPokemonList}
        limit={pokemonsPerPage}
        currentPage={currentPage}
      />
    </main>
  );
}

export default App;
