import React from 'react'

const userOutput = (props) => {
    const style = {
        borderColor: '#555',
        borderWidth: '1px',
        borderStyle: 'solid',
        padding: '8px',
        margin: '4px auto',
        width: '200px',
    };
    return (
        <div style={style}>
            <p>{props.username}</p>
            <p>{props.p2}</p>
        </div>
    );
};

export default userOutput;