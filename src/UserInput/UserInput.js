import React from 'react';
import './UserInput.css';

const userInput = (props) => {
    return (
        <input
            type="text"
            className="UserInput"
            onChange={props.eventHandler}
            value={props.username} />
    );
};

export default userInput;