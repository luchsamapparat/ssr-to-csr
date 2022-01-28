import { ActionFunction, LoaderFunction, useActionData, useLoaderData } from 'remix';
import { get, submit } from '~/lib/http';
import { isConstraintViolation, ValidationError, Violation } from '~/lib/validation';
import AddTaskForm from '../components/add-task-form/add-task-form';
import EmptyTaskList from '../components/task-list/empty-list-alert';
import TaskList from '../components/task-list/task-list';
import { NewTask, Task } from '../lib/task';

export const loader: LoaderFunction = async ({ }) => {
    return {
        tasks: await get('/tasks')
    }
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    if (formData.get('_action') === 'addTask') {
        const values = {
            description: formData.get('description'),
            dueDate: formData.get('dueDate')
        };
        try {
            await submit('/tasks', 'POST', values);
        } catch (error: any) {
            if (isConstraintViolation(error)) {
                return {
                    values,
                    violations: error.violations
                }
            }
            throw error;
        }
        return {
            values: null,
            violations: null
        }
    }

    if (formData.get('_action') === 'markAsCompleted') {
        const completedTasks = formData.getAll('completedTasks[]');

        return await submit('/tasks/completed', 'POST', {
            completedTasks: completedTasks
        })
    }

    throw new Response("Invalid action", {
        status: 400
    });
}

export default function Tasks() {
    const { tasks } = useLoaderData<{ tasks: Task[] }>();
    const actionData = useActionData<{ values: NewTask | null, violations: Violation[] | null }>();

    return (
        <>
            {(tasks === null) ? null :
                (tasks.length === 0) ?
                    <EmptyTaskList text="All done!" /> :
                    <TaskList action="/?index" tasks={tasks} />
            }
            <AddTaskForm
                action="/?index"
                values={actionData?.values ?? null}
                validationError={actionData?.violations ? new ValidationError(actionData?.violations) : null} />
        </>
    );
};
