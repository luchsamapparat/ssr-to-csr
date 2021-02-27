import { GetServerSideProps } from 'next';
import React, { FunctionComponent } from 'react';
import CompletedTasksList from '../../components/task-list/completed-tasks-list';
import EmptyListAlert from '../../components/task-list/empty-list-alert';
import { get } from '../../lib/http';
import { getLanguage, LanguageContext } from '../../lib/language-context';
import { Task } from '../../lib/task';

type CompletedTasksProps = {
    tasks: Task[],
    language: string
};

const CompletedTasks: FunctionComponent<CompletedTasksProps> = ({ tasks, language }) => {
    return (
        <LanguageContext.Provider value={language}>
            {(tasks === null) ? null :
                (tasks.length === 0) ?
                    <EmptyListAlert text="No tasks have been completed yet." /> :
                    <CompletedTasksList tasks={tasks} />
            }
        </LanguageContext.Provider>
    );
};

export default CompletedTasks;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    return {
        props: {
            tasks: await get('/tasks/completed'),
            language: getLanguage(req)
        }
    }
}
