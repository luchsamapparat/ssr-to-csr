import React, { FormEvent, FunctionComponent, useState } from 'react';
import { NewTask } from '../../lib/task';
import { ValidationError } from '../../lib/validation';
import DescriptionInput from './description-input';
import DueDateInput from './due-date-input';

type AddTaskFormProps = {
    onAddTask: (newTask: NewTask) => Promise<void>
};

const AddTaskForm: FunctionComponent<AddTaskFormProps> = ({ onAddTask }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<ValidationError | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    const clearForm = () => {
        setDescription('');
        setDueDate(null);
        setValidationError(null);
        setIsDirty(false);
    };

    const handleChange = () => {
        setIsDirty(true);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await onAddTask({ description, dueDate });
            clearForm();
        } catch (error) {
            if (error instanceof ValidationError) {
                setValidationError(error);
            }
        }
    };

    const formValidatedCssClass = (isDirty && validationError === null) ? 'was-validated' : '';

    return (
        <form className={`add-task-form row needs-validation ${formValidatedCssClass}`} onChange={handleChange} onSubmit={handleSubmit}>
            <DescriptionInput
                value={description}
                violations={getViolations(validationError, 'description')}
                onChange={setDescription} />

            <DueDateInput
                value={dueDate}
                violations={getViolations(validationError, 'dueDate')}
                onChange={setDueDate} />

            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 mb-3 d-flex flex-wrap align-content-start">
                <button className="add-task btn btn-primary flex-fill" style={{ marginTop: '32px' }}>
                    Add{' '}
                    <span className="d-sm-none">Task</span>
                </button>
            </div>
        </form>
    );
};

const getViolations = (validationError: ValidationError | null, formControlName: string) => {
    return validationError?.violations.filter(error => error.field === formControlName);
};

export default AddTaskForm;