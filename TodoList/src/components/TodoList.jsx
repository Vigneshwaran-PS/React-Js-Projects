import React, { useEffect, useState } from 'react';

export const TodoList = () => {
    const [tasks, setTasks] = useState(()=>{
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });  
    const [taskName, setTaskName] = useState("");

    const addTask = () => {
        if (taskName.trim() === "") return; 
        setTasks([...tasks, { id: tasks.length + 1, name: taskName, isCompleted : false }]); 
        setTaskName(""); 
        localStorage.setItem("tasks",JSON.stringify(tasks))
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const taskCompleted = (id) => {
        setTasks((tasks)=>{
           return tasks.map(task => 
                task.id === id ?{...task,isCompleted : true} :task
            )
        }); 
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="container">
            <h2>Todo List</h2>
            <div className="add-task">
                <input
                    type="text"
                    placeholder="Add your task"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <button className="btn" onClick={addTask}>Add Task</button>
            </div>

            <div className="tasks">
                {tasks.length === 0 ? (
                    <p>No tasks added</p>
                ) : (
                    <div className="listing">
                        <p>Fill Task Details</p>
                        {tasks.map((t) => (
                            <div className="task" key={t.id}>
                                <div className={t.isCompleted ? "strike" : ""} onClick={()=>taskCompleted(t.id)}>{t.name}</div>
                                <button onClick={() => removeTask(t.id)}>x</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
