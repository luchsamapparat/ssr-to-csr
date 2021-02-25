import React, { FunctionComponent } from 'react';
import { Task } from '../../lib/task';
import CompletedTasksListItem from './completed-tasks-list-item';

type CompletedTasksListProps = {
    tasks: Task[]
}

const CompletedTasksList: FunctionComponent<CompletedTasksListProps> = ({ tasks }) => (
    <ul className="mb-5">
        {tasks.map(task => <CompletedTasksListItem task={task} key={task.id} />)}
    </ul>
);

export default CompletedTasksList;