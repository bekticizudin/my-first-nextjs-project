import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const Pagination: React.FC = () => {
  const { currentPage, totalUsers, setCurrentPage } = useContext(UserContext);
  const totalPages = Math.ceil(totalUsers.length / 5);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;