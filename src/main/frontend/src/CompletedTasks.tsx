import React, { useEffect, useState } from 'react';
import { get } from './http';
import { Task } from './task';
import CompletedTasksList from './TaskList/CompletedTasksList';
import EmptyListAlert from './TaskList/EmptyListAlert';

const CompletedTasks = () => {
    const [tasks, setTasks] = useState<Task[] | null>(null);

    useEffect(
        () => {
            get('/tasks/completed')
                .then(tasks => setTasks(tasks));
        },
        []
    );

    return (<>
        {(tasks === null) ? null :
            (tasks.length === 0) ?
                <EmptyListAlert text="No tasks have been completed yet." /> :
                <CompletedTasksList tasks={tasks} />
        }
    </>);
};

export default CompletedTasks;