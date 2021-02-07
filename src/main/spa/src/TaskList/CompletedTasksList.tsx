import React, { FunctionComponent } from 'react';
import { Task } from '../task';
import CompletedTasksListItem from './CompletedTasksListItem';

type CompletedTasksListProps = {
    tasks: Task[]
}

const CompletedTasksList: FunctionComponent<CompletedTasksListProps> = ({ tasks }) => (
    <ul className="list-unstyled">
        {tasks.map(task => <CompletedTasksListItem task={task} key={task.id} />)}
    </ul>
);

export default CompletedTasksList;