import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const Pagination: React.FC = () => {
  const { currentPage, totalUsers, setCurrentPage, users } = useContext(UserContext);
  const totalPages = Math.ceil(totalUsers.length / 5);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayPagination = totalPages > 1 && users.length > 4;

  return (
    <div>
      {displayPagination && (
        <>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
              {i + 1}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default Pagination;