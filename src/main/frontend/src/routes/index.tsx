import { ActionFunction, LoaderFunction, useLoaderData } from 'remix';
import { get, submit } from '~/lib/http';
import AddTaskForm from '../components/add-task-form/add-task-form';
import EmptyTaskList from '../components/task-list/empty-list-alert';
import TaskList from '../components/task-list/task-list';
import { Task } from '../lib/task';

export const loader: LoaderFunction = async ({ }) => {
    return {
        tasks: await get('/tasks')
    }
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    return await submit('/tasks', 'POST', {
        description: formData.get('description'),
        dueDate: formData.get('dueDate')
    })
}

export default function Tasks() {
    const handleCompleteTask = () => { };

    const { tasks } = useLoaderData<{ tasks: Task[] }>();

    // const handleAddTask = async (newTask: NewTask) => {
    //     try {
    //         setTasks();
    //     } catch (error) {
    //         if (error.status === 422) {
    //             throw new ValidationError(error.violations);
    //         }
    //     }
    // };

    // const handleCompleteTask = async (taskId: string) => setTasks(
    //     await submit('/tasks/completed', 'POST', {
    //         completedTasks: [taskId]
    //     })
    // );

    return (
        <>
            {(tasks === null) ? null :
                (tasks.length === 0) ?
                    <EmptyTaskList text="All done!" /> :
                    <TaskList tasks={tasks} onCompleteTask={handleCompleteTask} />
            }
            <AddTaskForm action="/?index" />
        </>
    );
};
