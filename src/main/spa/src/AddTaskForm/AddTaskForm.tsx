import React, { FormEvent, FunctionComponent, useState } from 'react';
import { NewTask } from '../task';
import DescriptionInput from './DescriptionInput';
import DueDateInput from './DueDateInput';

type AddTaskFormProps = {
    onAddTask: (newTask: NewTask) => Promise<void>
};

const AddTaskForm: FunctionComponent<AddTaskFormProps> = ({ onAddTask }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<string | null>(null);

    const clearForm = () => {
        setDescription('');
        setDueDate(null);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onAddTask({ description, dueDate });
        clearForm();
    };
    
    return (
        <form className="add-task-form row needs-validation" onSubmit={handleSubmit}>
            <DescriptionInput value={description} onChange={setDescription} />
            <DueDateInput value={dueDate} onChange={setDueDate} />

            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 mb-3 d-flex flex-wrap align-content-start">
                <button className="add-task btn btn-primary flex-fill" style={{ marginTop: '32px' }}>
                    Add
                    <span className="d-sm-none">Task</span>
                </button>
            </div>
        </form>
    );
};

export default AddTaskForm;