import React, { FunctionComponent, useCallback, useRef } from 'react';
import { Form } from 'remix';
import { Task } from '../../lib/task';
import TaskListItem from './task-list-item';

type TaskListProps = {
    action: string,
    tasks: Task[]
}

const TaskList: FunctionComponent<TaskListProps> = ({ action, tasks }) => {
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const onCompleteTask = useCallback(() => submitButtonRef.current?.click(), [submitButtonRef]);

    return (
        <Form method="post" action={action} className="task-list mb-5">
            <input type="hidden" name="_action" value="markAsCompleted" />
            <ul className="list-unstyled">
                {tasks.map(task => <TaskListItem task={task} onComplete={onCompleteTask} key={task.id} />)}
            </ul>

            <button className="mark-as-completed btn btn-primary hidden-on-client" ref={submitButtonRef}>Mark as Completed</button>
        </Form>
    )
};

export default TaskList;