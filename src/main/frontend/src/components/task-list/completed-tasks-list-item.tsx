import React, { FunctionComponent } from 'react';
import { Task } from '../../lib/task';
import DueDate from './due-date';

type CompletedTasksListItemProps = {
    task: Task
}

const CompletedTasksListItem: FunctionComponent<CompletedTasksListItemProps> = ({ task }) => {
    return (
        <li>
            <span>{task.description}</span>
            <DueDate dueDate={task.dueDate} />
        </li>
    );
};

export default CompletedTasksListItem;