import React, { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm/AddTaskForm';
import { get, submit } from './http';
import { NewTask, Task } from './task';
import EmptyTaskList from './TaskList/EmptyListAlert';
import TaskList from './TaskList/TaskList';
import { ValidationError } from './validation';

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[] | null>(null);

    useEffect(
        () => {
            get('/tasks')
                .then(tasks => setTasks(tasks));
        },
        []
    );

    const handleAddTask = async (newTask: NewTask) => {
        try {
            setTasks(await submit('/tasks', 'POST', newTask));
        } catch (error) {
            if (error.status === 422) {
                throw new ValidationError(error.violations);
            }
        }
    };

    const handleCompleteTask = async (taskId: string) => setTasks(
        await submit('/tasks/completed', 'POST', {
            completedTasks: [taskId]
        })
    );

    return (<>
        {(tasks === null) ? null :
            (tasks.length === 0) ?
                <EmptyTaskList text="All done!" /> :
                <TaskList tasks={tasks} onCompleteTask={handleCompleteTask} />
        }
        <AddTaskForm onAddTask={handleAddTask} />
    </>);
};

export default Tasks;