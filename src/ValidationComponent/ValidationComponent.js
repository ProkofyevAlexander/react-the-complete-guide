import React from 'react';

const validationCompany = (props) => {
    const result = props.length < 5
        ? 'Text too short'
        : 'Text long enough';
    return <p>{result}</p>
};

export default validationCompany;