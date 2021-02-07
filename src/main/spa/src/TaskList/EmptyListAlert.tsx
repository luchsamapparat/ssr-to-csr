import React, { FunctionComponent } from 'react';

type EmptyListAlertProps = {
    text: string
}

const EmptyListAlert: FunctionComponent<EmptyListAlertProps> = ({ text }) => (
    <p className="alert alert-success mb-5" role="alert">{text}</p>
);

export default EmptyListAlert;