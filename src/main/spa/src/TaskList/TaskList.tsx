import React, { FunctionComponent } from 'react';
import { Task } from '../task';
import TaskListItem from './TaskListItem';

type TaskListProps = {
    tasks: Task[],
    onCompleteTask: (taskId: string) => void
}

const TaskList: FunctionComponent<TaskListProps> = ({ tasks, onCompleteTask }) => (
    <form className="task-list mb-5">
        <ul className="list-unstyled">
            {tasks.map(task => <TaskListItem task={task} onComplete={onCompleteTask} key={task.id} />)}
        </ul>

        <button className="mark-as-completed btn btn-primary">Mark as Completed</button>
    </form>
);

export default TaskList;