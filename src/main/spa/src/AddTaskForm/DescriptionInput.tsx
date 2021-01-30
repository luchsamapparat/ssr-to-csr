import React, { FormEvent, FunctionComponent } from 'react';

type DescriptionInputProps = {
    value: string;
    onChange: (value: string) => void;
};

const DescriptionInput: FunctionComponent<DescriptionInputProps> = ({ value, onChange }) => {
    const handleInput = ({ currentTarget }: FormEvent<HTMLInputElement>) => currentTarget.setCustomValidity('');
    const handleInvalid = ({ currentTarget }: FormEvent<HTMLInputElement>) => currentTarget.setCustomValidity('Please enter a task.');
    
    return (
        <div className="col-xl-9 col-lg-8 col-md-6 col-sm-6 mb-3">
            <label htmlFor="addTask-description" className="form-label">New Task</label>
            {/* th:errorclassName="is-invalid" */}
            <input
                type="text"
                id="addTask-description"
                value={value}
                className="form-control description"
                placeholder="Add as Task..." 
                required
                minLength={1}
                onInput={handleInput}
                onInvalid={handleInvalid}
                onChange={e => onChange(e.target.value)}
            />
            {/* <div th:if="${#fields.hasErrors('description')}" th:errors="*{description}" className="invalid-feedback"></div> */}
        </div>
    );
};

export default DescriptionInput;