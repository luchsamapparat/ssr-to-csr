import React, { FunctionComponent, useState } from 'react';
import { Form } from 'remix';
import { NewTask } from '~/lib/task';
import { ValidationError } from '../../lib/validation';
import DescriptionInput from './description-input';
import DueDateInput from './due-date-input';

type AddTaskFormProps = {
    action: string,
    values: NewTask | null,
    validationError: ValidationError | null
};

const AddTaskForm: FunctionComponent<AddTaskFormProps> = ({ action, values, validationError }) => {
    const [isDirty, setIsDirty] = useState(false);

    // const clearForm = () => {
    //     setDescription('');
    //     setDueDate(null);
    //     setValidationError(null);
    //     setIsDirty(false);
    // };

    const handleChange = () => {
        setIsDirty(true);
    };

    // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     try {
    //         await onAddTask({ description, dueDate });
    //         clearForm();
    //     } catch (error) {
    //         if (error instanceof ValidationError) {
    //             setValidationError(error);
    //         }
    //     }
    // };

    const formValidatedCssClass = (isDirty && validationError === null) ? 'was-validated' : '';

    return (
        <Form method="post" action={action} className={`add-task-form row needs-validation ${formValidatedCssClass}`} onChange={handleChange}>
            <DescriptionInput
                value={values?.description ?? ''}
                violations={getViolations(validationError, 'description')} />

            <DueDateInput
                value={values?.dueDate ?? ''}
                violations={getViolations(validationError, 'dueDate')} />

            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 mb-3 d-flex flex-wrap align-content-start">
                <button
                    name="_action"
                    value="addTask"
                    className="add-task btn btn-primary flex-fill"
                    style={{ marginTop: '32px' }}
                >
                    Add{' '}
                    <span className="d-sm-none">Task</span>
                </button>
            </div>
        </Form>
    );
};

const getViolations = (validationError: ValidationError | null, formControlName: string) => {
    return validationError?.violations.filter(error => error.field === formControlName);
};

export default AddTaskForm;