import React, { use, useEffect, useReducer, useState } from 'react';
import Employee, { EditEmployee } from './Employee';

const initialState = [
    { "id": 1, "name": "Vignesh", "age": 23, "city": "Madurai" },
    { "id": 2, "name": "Arun", "age": 25, "city": "Chennai" },
    { "id": 3, "name": "Priya", "age": 27, "city": "Coimbatore" },
    { "id": 4, "name": "Karthik", "age": 24, "city": "Trichy" },
    { "id": 5, "name": "Suresh", "age": 29, "city": "Bangalore" },
    { "id": 6, "name": "Ravi", "age": 31, "city": "Hyderabad" },
    { "id": 7, "name": "Divya", "age": 22, "city": "Pune" },
    { "id": 8, "name": "Kiran", "age": 26, "city": "Mumbai" },
    { "id": 9, "name": "Anjali", "age": 28, "city": "Delhi" },
    { "id": 10, "name": "Vikas", "age": 30, "city": "Kolkata" },
    { "id": 11, "name": "Ramesh", "age": 32, "city": "Madurai" },
    { "id": 12, "name": "Sneha", "age": 21, "city": "Chennai" },
    { "id": 13, "name": "Ajay", "age": 27, "city": "Coimbatore" },
    { "id": 14, "name": "Meena", "age": 23, "city": "Trichy" },
    { "id": 15, "name": "Harish", "age": 29, "city": "Bangalore" },
    { "id": 16, "name": "Pooja", "age": 25, "city": "Hyderabad" },
    { "id": 17, "name": "Gopal", "age": 28, "city": "Pune" },
    { "id": 18, "name": "Sunil", "age": 26, "city": "Mumbai" },
    { "id": 19, "name": "Reshma", "age": 24, "city": "Delhi" },
    { "id": 20, "name": "Sathish", "age": 30, "city": "Kolkata" }
];

function reduce(state, action) {
    switch (action.type) {
        case 'UPDATE':
            return state.map(emp =>
                emp.id === action.payload.id ? action.payload : emp
            );

        case 'DELETE':
            return state.filter(emp => emp.id !== action.payload);

        case 'ADD':
            return [...state, action.payload];

        default:
            return state;
    }
}

export const Employees = () => {
    const [state, dispatch] = useReducer(reduce, initialState);
    const [add, setAdd] = useState(false);
    const [searchQuery,setSearchQuery] = useState("")

    function updateEmployee(emp) {
        console.log(emp)
        dispatch({ type: "UPDATE", payload: emp });
    }

    function deleteEmployee(empId) {
        dispatch({ type: "DELETE", payload: empId });
    }

    function addEmployee(emp) {
        dispatch({ type: "ADD", payload: { ...emp, id: state.length + 1 } });
        setAdd(false);
    }


    const filteredEmployees = state.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.age.toString().includes(searchQuery)
      );  const filteredState = state.filter(emp => {

    })

    return (
        <div className="container">
            <h1>Employee Management</h1>

            <div className="buttons">
                <input
                    type="search"
                    placeholder="Search by Name, City, Age"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="add" onClick={() => setAdd(true)}>Add</button>
                {add && (
                    <EditEmployee employee={null} updateEmployee={addEmployee} cancel={() => setAdd(false)} />
                )}
            </div>

            <div className="emp-header">
                <div>S.No</div>
                <div>Name</div>
                <div>Age</div>
                <div>City</div>
                <div>Edit</div>
                <div>Delete</div>
            </div>
            <div className="line"></div>

            <div className="employees">
                {
                    filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee, index) => (
                        <Employee
                            key={employee.id}
                            employee={employee}
                            addEmployee={addEmployee}
                            deleteEmployee={deleteEmployee}
                            updateEmployee={updateEmployee}
                        />
                    ))
                ) : (
                    <p>No employees found</p>
                )}
            </div>
        </div>
    );
};
