import React, { FormEvent, FunctionComponent } from 'react';
import { getInvalidFormControlCssClass, Violation } from '../../lib/validation';

type DescriptionInputProps = {
    value: string,
    violations: Violation[] | undefined,
    onChange: (value: string) => void
};

const DescriptionInput: FunctionComponent<DescriptionInputProps> = ({ value, onChange, violations }) => {
    const handleInput = ({ currentTarget }: FormEvent<HTMLInputElement>) => currentTarget.setCustomValidity('');
    const handleInvalid = ({ currentTarget }: FormEvent<HTMLInputElement>) => currentTarget.setCustomValidity('Please enter a task.');

    return (
        <div className="col-xl-9 col-lg-8 col-md-6 col-sm-6 mb-3">
            <label htmlFor="addTask-description" className="form-label">New Task</label>
            <input
                type="text"
                id="addTask-description"
                value={value}
                className={`form-control description ${getInvalidFormControlCssClass(violations)}`}
                placeholder="Add as Task..."
                required
                minLength={1}
                onInput={handleInput}
                onInvalid={handleInvalid}
                onChange={e => onChange(e.target.value)}
            />
            {violations?.map(violation => (
                <div className="invalid-feedback" key={violation.message}>{violation.message}</div>
            ))}
        </div>
    );
};

export default DescriptionInput;