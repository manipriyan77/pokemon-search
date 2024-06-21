'use client';

import { useEffect, useState } from 'react';

export const usePokemon = (search) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
        const response = await fetch(url);
        const data = await response.json();
        let pokemonData = data.pokemon
          ? data.pokemon.map((p) => p.pokemon)
          : data.results;

        if (search) {
          pokemonData = pokemonData.filter((p) =>
            p.name.includes(search.toLowerCase())
          );
        }
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search]);

  return { pokemonList, loading };
};
