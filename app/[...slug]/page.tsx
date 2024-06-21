'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Slig = () => {
  const router = useParams();
  const [slug] = router.slug;
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchPokemon = async () => {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${slug}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPokemon(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchPokemon();
    }
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-300 h-full">
      <Link href="/" className="text-sky-400/100 underline">
        Back
      </Link>
      <section>
        <span>Home</span> {'->'} <span>{slug}</span>
      </section>
      {pokemon ? (
        <div className="w-[90%] m-auto flex flex-col items-center justify-center bg-white rounded-md p-3">
          <div className="bg-orange-300 w-full flex justify-center">
            <Image
              width={100}
              height={100}
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>
          <div>
            <p>
              <b>Name: </b>
              {pokemon.name}
            </p>
            <p>
              <b>Type: </b>
              {pokemon?.types.map((item, index) => {
                return (
                  <span key={item.type.name}>
                    {item.type.name}
                    {index < pokemon.types.length - 1 ? ', ' : ''}
                  </span>
                );
              })}
            </p>
            <p>
              <b>Stats: </b>
              {pokemon?.stats.map((item, index) => {
                return (
                  <span key={item.stat.name}>
                    {item.stat.name}
                    {index < pokemon.stats.length - 1 ? ', ' : ''}
                  </span>
                );
              })}
            </p>
            <p>
              <b>Abilities: </b>
              {pokemon?.abilities.map((item, index) => {
                return (
                  <span key={item.ability.name}>
                    {item.ability.name}
                    {index < pokemon.abilities.length - 1 ? ', ' : ''}
                  </span>
                );
              })}
            </p>
            <p>
              <b>Some moves: </b>
              {pokemon?.moves.slice(0, 5).map((item, index, arr) => {
                return (
                  <span key={item.move.name}>
                    {item.move.name}
                    {index < arr.length - 1 ? ', ' : ''}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      ) : (
        <div>Loading Pokémon...</div>
      )}
    </div>
  );
};

export default Slig;
