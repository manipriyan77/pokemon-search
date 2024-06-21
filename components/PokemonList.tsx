import Image from 'next/image';
import Link from 'next/link';

const PokemonList = ({ pokemonList }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemonList.map((pokemon) => {
        let parts = pokemon.url.split('/');
        parts = parts[parts.length - 2];
        return (
          <div
            key={pokemon.name}
            className="border rounded shadow-md flex-col justify-center items-center flex"
          >
            <div>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parts}.png`}
                alt=""
                width={100}
                height={100}
              />
            </div>
            <span className="block p-4">{pokemon.name}</span>

            <Link href={`/${pokemon.name}`} className="text-sky-400/100">
              Details
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
