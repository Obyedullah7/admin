import React, { useState } from 'react';
import { ImBlocked } from 'react-icons/im';
import { CgUnblock } from 'react-icons/cg';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', status: 'active' },
    
  ]);

  const toggleStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        user.status = user.status === 'active' ? 'blocked' : 'active';
      }
      return user;
    }));
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 overflow-x-auto">
      <strong className="text-gray-700 font-medium">View Users</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span 
                    className={`inline-block py-1 px-2 rounded ${user.status === 'active' ? 'bg-teal-200 text-teal-700' : 'bg-rose-200 text-rose-700'}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded" onClick={() => toggleStatus(user.id)}>
                    {user.status === 'active' ? <ImBlocked /> : <CgUnblock />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
