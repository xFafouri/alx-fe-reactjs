// src/components/SearchBar.jsx
import { useRef } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const inputRef = useRef();

  // simple debounce helper
  let timeout;
  const handleChange = (e) => {
    const value = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => setSearchTerm(value), 200); // 200ms debounce
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search title or description..."
      onChange={handleChange}
    />
  );
};

export default SearchBar;
