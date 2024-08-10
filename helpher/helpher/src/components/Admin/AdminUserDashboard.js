import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';


export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/login');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const createUser = async () => {
    try {
      await axios.post('http://localhost:8080/login', newUser);
      fetchUsers();
      setNewUser({ firstName: '', lastName: '', email: '', phonenumber: '', password: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:8080/login/${editUser.id}`, editUser);
      fetchUsers();
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/login/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className='admin-header'>Admin Dashboard</h1>
      
      {/* Create User Form */}
      <h2 className='admin-header2'>Create User</h2>
      <input type="text" name="firstName" placeholder="First Name" value={newUser.firstName} onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" value={newUser.lastName} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} />
      <input type="tel" name="phonenumber" placeholder="Phone Number" value={newUser.phonenumber} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} />
      <button onClick={createUser}>Create</button>
      
      {/* Edit User Form */}
      {editUser && (
        <div>
          <h2>Edit User</h2>
          <input type="text" name="firstName" placeholder="First Name" value={editUser.firstName} onChange={handleEditChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={editUser.lastName} onChange={handleEditChange} />
          <input type="email" name="email" placeholder="Email" value={editUser.email} onChange={handleEditChange} />
          <input type="tel" name="phonenumber" placeholder="Phone Number" value={editUser.phonenumber} onChange={handleEditChange} />
          <input type="password" name="password" placeholder="Password" value={editUser.password} onChange={handleEditChange} />
          <button onClick={updateUser}>Update</button>
        </div>
      )}

      {/* User Table */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td className="actions">
                <button onClick={() => setEditUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
