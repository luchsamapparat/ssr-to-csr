import { GetServerSideProps } from 'next';
import React, { FunctionComponent, useState } from 'react';
import AddTaskForm from '../components/add-task-form/add-task-form';
import EmptyTaskList from '../components/task-list/empty-list-alert';
import TaskList from '../components/task-list/task-list';
import { get, submit } from '../lib/http';
import { NewTask, Task } from '../lib/task';
import { ValidationError } from '../lib/validation';

type TasksProps = {
    tasks: Task[]
};

const Tasks: FunctionComponent<TasksProps> = ({ tasks: preloadedTasks }) => {
    const [tasks, setTasks] = useState<Task[]>(preloadedTasks);

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

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {
            tasks: await get('/tasks')
        }
    }
}