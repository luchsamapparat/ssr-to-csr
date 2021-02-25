import { GetServerSideProps } from 'next';
import React, { FunctionComponent } from 'react';
import CompletedTasksList from '../../components/task-list/completed-tasks-list';
import EmptyListAlert from '../../components/task-list/empty-list-alert';
import { get } from '../../lib/http';
import { Task } from '../../lib/task';

type CompletedTasksProps = {
    tasks: Task[]
};

const CompletedTasks: FunctionComponent<CompletedTasksProps> = ({ tasks }) => {
    return (<>
        {(tasks === null) ? null :
            (tasks.length === 0) ?
                <EmptyListAlert text="No tasks have been completed yet." /> :
                <CompletedTasksList tasks={tasks} />
        }
    </>);
};

export default CompletedTasks;

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {
            tasks: await get('/tasks/completed')
        }
    }
}