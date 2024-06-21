'use client';

import { useState } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import SearchForm from '../components/SearchForm';
import PokemonList from '../components/PokemonList';

const Home = () => {
  const [search, setSearch] = useState('');
  const { pokemonList, loading } = usePokemon(search);

  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Search</h1>
      <SearchForm onSearch={handleSearch} pokemonList={pokemonList} />
      {pokemonList.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <PokemonList pokemonList={pokemonList} />
      )}
    </div>
  );
};

export default Home;
