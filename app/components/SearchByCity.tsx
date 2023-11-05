import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const SearchByCity: React.FC = () => {
  const { searchByCity } = useContext(UserContext);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    searchByCity(city);
  };

  return (
    <div>
      <input type="text" placeholder="Search by city..." onChange={handleSearch} />
    </div>
  );
};

export default SearchByCity;