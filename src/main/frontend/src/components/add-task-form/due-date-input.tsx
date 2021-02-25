import React, { FormEvent, FunctionComponent } from 'react';
import { getInvalidFormControlCssClass, Violation } from '../../lib/validation';

type DueDateInputProps = {
    value: string | null,
    violations: Violation[] | undefined,
    onChange: (value: string | null) => void
};

const DueDateInput: FunctionComponent<DueDateInputProps> = ({ value, onChange, violations }) => {
    const handleInput = ({ currentTarget }: FormEvent<HTMLInputElement>) => currentTarget.setCustomValidity('');
    const handleInvalid = ({ currentTarget }: FormEvent<HTMLInputElement>) => currentTarget.setCustomValidity('Please pick a future date.');

    const today = toIsoDate(new Date());

    const handleChange = (dueDate: string) => (dueDate.length === 0) ? onChange(null) : onChange(dueDate);

    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 mb-3">
            <label htmlFor="addTask-dueDate" className="form-label">Due Date</label>
            <input
                type="date"
                id="addTask-dueDate"
                value={(value === null) ? '' : value}
                className={`form-control due-date ${getInvalidFormControlCssClass(violations)}`}
                min={today}
                onInput={handleInput}
                onInvalid={handleInvalid}
                onChange={e => handleChange(e.target.value)}
            />
            {violations?.map(violation => (
                <div className="invalid-feedback" key={violation.message}>{violation.message}</div>
            ))}
        </div>
    );
};

const toIsoDate = (date: Date) => date.toISOString().split('T')[0];

export default DueDateInput;