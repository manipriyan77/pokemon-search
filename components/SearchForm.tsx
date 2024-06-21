'use client';

import { useState, useEffect, useRef } from 'react';

const SearchForm = ({ onSearch, pokemonList }) => {
  const [search, setSearch] = useState('');
  const debounceTimer = useRef(null);

  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced search function
  const debouncedSearch = debounce((searchTerm) => {
    onSearch(searchTerm);
  }, 100);

  useEffect(() => {
    if (search !== '') {
      debouncedSearch(search);
    } else {
      onSearch('');
    }
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(type, search);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search Pokémon"
          className="p-2 border rounded-md mr-2 bg-transparent"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
