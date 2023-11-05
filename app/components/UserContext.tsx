import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  address: {
    street: string;
    suite: string;
    city: string;
  };
  phone: string;
  company: {
    name: string;
  };
}

interface UserContextProps {
  users: User[];
  totalUsers: User[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  sortUsers: () => void;
  searchByCity: (city: string) => void;
}

export const UserContext = createContext<UserContextProps>({
  users: [],
  totalUsers: [],
  currentPage: 1,
  setCurrentPage: () => {},
  sortUsers: () => {},
  searchByCity: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setTotalUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  const sortUsers = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  const searchByCity = (city: string) => {
    const filteredUsers = totalUsers.filter((user) => user.address.city.toLowerCase().includes(city.toLowerCase())
    );
    setUsers(filteredUsers);
    setCurrentPage(1);
  };
  

  const indexOfLastUser = currentPage * 5;
  const indexOfFirstUser = indexOfLastUser - 5;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (error) {
    return <div className='text-center'>Error fetching data. Please try again later.</div>;
  }

  return (
    <UserContext.Provider 
    value={{ 
      users: currentUsers, 
      totalUsers, 
      currentPage, 
      setCurrentPage, 
      sortUsers, 
      searchByCity 
      }}
      >{children}
    </UserContext.Provider>
  );
};