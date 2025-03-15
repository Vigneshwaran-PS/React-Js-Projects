import React, { useState } from 'react'


export function EditEmployee({employee,updateEmployee,cancel}){

    const [editedEmployee, setEditedEmployee] = useState({...employee});

    const handleChange =(e) => {
        console.log("das")
        const name = e.target.name
        const value = e.target.value
        setEditedEmployee({...editedEmployee,[name]:value})
    }

    return(
        <div className="overlay">
            <div className="overlay-content">
                <h2>Edit Employee</h2>
                <label>
                    Name:
                    <input type="text" name="name" value={editedEmployee.name} onChange={handleChange} />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={editedEmployee.age} onChange={handleChange} />
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={editedEmployee.city} onChange={handleChange} />
                </label>
                <div className="overlay-buttons">
                    <button onClick={() => updateEmployee(editedEmployee)}>Save</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
            </div>
      </div>
    )
}

const Employee = ({ employee,addEmployee,deleteEmployee,updateEmployee}) => {

    const [showEditScreen,setShowEditScreen] = useState(false)
  return (
    <div className='employee'>
        <div>{employee.id}</div>
        <div>{employee.name}</div>
        <div>{employee.age}</div>
        <div>{employee.city}</div>
        <div className='btn'><button className='edit' onClick={() => setShowEditScreen(true)}>Edit</button></div>
        <div className='btn'><button className='delete' onClick={()=>deleteEmployee(employee.id)}>Delete</button></div>

        {
            showEditScreen && 
                <>
                    <EditEmployee
                        employee={employee}
                        updateEmployee={(updatedEmployeeDetails) => {
                            setShowEditScreen(false)
                            updateEmployee(updatedEmployeeDetails)
                        }}
                        cancel={()=>setShowEditScreen(false)}
                    />
                </>
        }
    </div>
  )
}

export default Employee