import React, { FunctionComponent } from 'react';
import { Task } from '../../lib/task';
import DueDate from './due-date';

type TaskListItemProps = {
    task: Task,
    onComplete: (taskId: string) => void
}

const TaskListItem: FunctionComponent<TaskListItemProps> = ({ task, onComplete }) => {
    const inputId = `completedTasks-${task.id}`;
    return (
        <li className="form-check">
            <input
                type="checkbox"
                name="completedTasks[]"
                id={inputId}
                value={task.id}
                className="form-check-input completed-task"
                onChange={() => onComplete(task.id)} />

            <label htmlFor={inputId} className="form-check-label">
                <span>{task.description}</span>
                <DueDate dueDate={task.dueDate} />
            </label>
        </li>
    );
};

export default TaskListItem;