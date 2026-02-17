import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // fetch('/api/users')
    //   .then(res => res.json())
    //   .then(setUsers);
  }, []);

  const toggleRole = (id: string, currentRole: User['role']) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    // fetch(`/api/users/${id}/role`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ role: newRole })
    // }).then(() => {
    //   setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    // });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => toggleRole(user.id, user.role)}>
                  Toggle Admin
                </button>
                <button onClick={() => { /* disable user */ }}>Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;