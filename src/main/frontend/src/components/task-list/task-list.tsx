import React, { FunctionComponent } from 'react';
import { Task } from '../../lib/task';
import TaskListItem from './task-list-item';

type TaskListProps = {
    tasks: Task[],
    onCompleteTask: (taskId: string) => void
}

const TaskList: FunctionComponent<TaskListProps> = ({ tasks, onCompleteTask }) => (
    <form className="task-list mb-5">
        <ul className="list-unstyled">
            {tasks.map(task => <TaskListItem task={task} onComplete={onCompleteTask} key={task.id} />)}
        </ul>
    </form>
);

export default TaskList;