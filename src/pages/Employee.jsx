import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const Employees = () => {
  const initialEmployeeState = [
    { id: 1, name: "John Doe", address: "123 Main St", phone: "555-123-4567" },
    { id: 2, name: "Jane Smith", address: "456 Elm St", phone: "555-987-6543" },
    { id: 3, name: "Bob Johnson", address: "789 Oak St", phone: "555-567-8901" },
  ];

  const [employees, setEmployees] = useState(initialEmployeeState);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [inputState, setInputState] = useState({});

  const employeeSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const address = form.address.value;
    const phone = form.phone.value;

    const newEmployee = {
      id: employees.length + 1,
      name,
      address,
      phone,
    };

    const addedEmployees = [...employees, newEmployee];

    setEmployees(addedEmployees);
    form.reset();
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const editButtonHandler = (id) => {
    setEditedEmployee(id);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const saveEmployee = (id) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === id) {
        employee.name = inputState.name || employee.name;
        employee.address = inputState.address || employee.address;
        employee.phone = inputState.phone || employee.phone;
      }
      return employee;
    });

    setEmployees(updatedEmployees);
    setEditedEmployee(null);
    setInputState({});
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="mb-4">
        <strong className="text-gray-700 font-medium mb-2">Insert Employee</strong>
        <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start">
          <form onSubmit={employeeSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5 flex"
              type="submit"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>

      <strong className="text-gray-700 font-medium">View Employees</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>
                  {editedEmployee === employee.id ? (
                    <input
                      type="text"
                      name="name"
                      defaultValue={employee.name}
                      onChange={inputHandler}
                    />
                  ) : (
                    employee.name
                  )}
                </td>
                <td>
                  {editedEmployee === employee.id ? (
                    <input
                      type="text"
                      name="address"
                      defaultValue={employee.address}
                      onChange={inputHandler}
                    />
                  ) : (
                    employee.address
                  )}
                </td>
                <td>
                  {editedEmployee === employee.id ? (
                    <input
                      type="text"
                      name="phone"
                      defaultValue={employee.phone}
                      onChange={inputHandler}
                    />
                  ) : (
                    employee.phone
                  )}
                </td>
                <td>
                  {editedEmployee === employee.id ? (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded font-bold mr-1"
                      onClick={() => saveEmployee(employee.id)}
                    >
                      <RxUpdate />
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                      onClick={() => editButtonHandler(employee.id)}
                    >
                      <AiFillEdit />
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <MdDeleteForever />
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

export default Employees;