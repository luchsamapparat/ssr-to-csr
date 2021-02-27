import React, { FunctionComponent } from 'react';

type DueDateProps = {
    dueDate: string | null
}

const DueDate: FunctionComponent<DueDateProps> = ({ dueDate }) => {
    if (dueDate === null) {
        return null;
    }

    return <span className="text-secondary ps-2">{formatDate(dueDate)}</span>;
};

const formatDate = (date: string) => new Intl.DateTimeFormat(
    navigator.language,
    { year: '2-digit', month: '2-digit', day: '2-digit' }
)
    .format(new Date(date));

export default DueDate;