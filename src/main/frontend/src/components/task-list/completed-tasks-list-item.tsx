import React, { FunctionComponent } from 'react';
import { Task } from '../../lib/task';
import CompletedDate from './completed-date';

type CompletedTasksListItemProps = {
    task: Task
}

const CompletedTasksListItem: FunctionComponent<CompletedTasksListItemProps> = ({ task }) => {
    return (
        <li>
            <span>{task.description}</span>
            <CompletedDate completedDate={task.completedDate} />
        </li>
    );
};

export default CompletedTasksListItem;