import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

const UserTable: React.FC = () => {
  const { users, sortUsers } = useContext(UserContext);

  const handleSort = () => {
    sortUsers();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name <button onClick={handleSort}>Sort</button></th>
          <th>Address</th>
          <th>Phone</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}`}</td>
            <td>{user.phone}</td>
            <td>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;