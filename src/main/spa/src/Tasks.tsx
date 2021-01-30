import React, { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm/AddTaskForm';
import { get, submit } from './http';
import { NewTask, Task } from './task';
import EmptyTaskList from './TaskList/EmptyTaskList';
import TaskList from './TaskList/TaskList';

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(
        () => {
            get('/tasks')
                .then(tasks => setTasks(tasks));
        },
        []
    );

    const handleAddTask = async (newTask: NewTask) => setTasks(
        await submit('/tasks', 'POST', newTask)
    );

    const handleCompleteTask = async (taskId: string) => setTasks(
        await submit('/tasks/completed', 'POST', {
            completedTasks: [taskId]
        })
    );

    return (<>
        {(tasks.length === 0) ? <EmptyTaskList /> : <TaskList tasks={tasks} onCompleteTask={handleCompleteTask}></TaskList>}
        <AddTaskForm onAddTask={handleAddTask} />
    </>);
};

export default Tasks;