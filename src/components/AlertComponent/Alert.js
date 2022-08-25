import React from 'react';
import './Alert.css';

export const Alert = (props) => {
    const { alert } = props;
    return (
        <div className={`alert-box ${alert.type}`}>
            {alert.msg}
        </div>
    );
}
