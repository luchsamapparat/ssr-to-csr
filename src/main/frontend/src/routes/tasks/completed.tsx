import CompletedTasksList from '../../components/task-list/completed-tasks-list';
import EmptyListAlert from '../../components/task-list/empty-list-alert';
import { Task } from '../../lib/task';

export default function CompletedTasks() {
    const tasks: Task[] = [];

    return (
        <>
            {(tasks === null) ? null :
                (tasks.length === 0) ?
                    <EmptyListAlert text="No tasks have been completed yet." /> :
                    <CompletedTasksList tasks={tasks} />
            }
        </>
    );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//     return {
//         props: {
//             tasks: await get('/tasks/completed'),
//         }
//     }
// }
