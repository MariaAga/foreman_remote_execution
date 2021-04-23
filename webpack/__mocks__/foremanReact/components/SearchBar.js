import React from 'react';

const SearchBar = ({ onChange }) => (
  <input
    className="foreman-search"
    onChange={onChange}
    placeholder="Filter..."
  />
);
export default SearchBar;
