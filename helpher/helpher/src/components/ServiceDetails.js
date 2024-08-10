// ServiceDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ServiceDetails.css'; // Create a CSS file for styling

const ServiceDetails = () => {
  const { serviceName } = useParams();
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch employees for the selected service
    // Replace with your API call
    setEmployees([
      { id: 1, name: 'Jane Doe', email: 'jane@example.com' },
      // Add other employees here
    ]);
  }, [serviceName]);

  const handleAddEmployee = () => {
    // Add employee logic
    setIsEditing(true);
  };

  const handleSaveEmployee = () => {
    // Save employee logic
    setIsEditing(false);
    setEmployeeForm({ name: '', email: '' });
  };

  return (
    <div className="service-details">
      <h1>{serviceName} Employees</h1>
      <button onClick={handleAddEmployee}>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="employee-form">
          <h2>Add/Edit Employee</h2>
          <label>
            Name:
            <input
              type="text"
              value={employeeForm.name}
              onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={employeeForm.email}
              onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
            />
          </label>
          <button onClick={handleSaveEmployee}>Save</button>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
