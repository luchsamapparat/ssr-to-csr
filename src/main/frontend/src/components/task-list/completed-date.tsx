import TimeAgo from 'javascript-time-ago';
import de from 'javascript-time-ago/locale/de';
import en from 'javascript-time-ago/locale/en';
import React, { FunctionComponent } from 'react';

type CompletedDateProps = {
    completedDate: string | null
}

const CompletedDate: FunctionComponent<CompletedDateProps> = ({ completedDate }) => {
    if (completedDate === null) {
        return null;
    }

    return <span className="text-secondary ps-2">{formatDate(completedDate)}</span>;
};

TimeAgo.addLocale(de);
TimeAgo.addDefaultLocale(en);

const formatDate = (date: string) => new TimeAgo(navigator.language).format(new Date(date));

export default CompletedDate;