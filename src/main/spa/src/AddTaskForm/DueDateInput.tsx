import React, { FormEvent, FunctionComponent } from 'react';

type DescriptionInputProps = {
    value: string | null;
    onChange: (value: string | null) => void;
};

const DescriptionInput: FunctionComponent<DescriptionInputProps> = ({ value, onChange }) => {
    const today = toIsoDate(new Date());

    const onInput = ({ currentTarget }: FormEvent<HTMLInputElement>) => currentTarget.setCustomValidity('');
    const onInvalid = ({ currentTarget }: FormEvent<HTMLInputElement>) => currentTarget.setCustomValidity('Please enter a task.');

    const handleChange = (dueDate: string) => (dueDate.length === 0) ? onChange(null) : onChange(dueDate);

    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 mb-3">
            <label htmlFor="addTask-dueDate" className="form-label">Due Date</label>
            {/* th:errorclassName="is-invalid" */}
            <input
                type="date"
                id="addTask-dueDate"
                value={(value === null) ? '' : value}
                className="form-control due-date"
                min={today}
                onInput={onInput}
                onInvalid={onInvalid}
                onChange={e => handleChange(e.target.value)}
            />
            {/* <div th:if="${#fields.hasErrors('dueDate')}" th:errors="*{dueDate}" className="invalid-feedback"></div> */}
        </div>
    );
};

const toIsoDate = (date: Date) => date.toISOString().split('T')[0];

export default DescriptionInput;