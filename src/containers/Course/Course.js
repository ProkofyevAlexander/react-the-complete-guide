import React, { Component } from 'react';

class Course extends Component {
    render () {
        const search = window.location.search.slice(1);
        const searchParts = search.split('&').map((searchPart) => {
            const keyValue = searchPart.split('=');
            return {
                key: keyValue[0],
                value: decodeURI(keyValue[1])
            }
        });
        const titleSearchPart = searchParts.find((item) => item.key === 'title');
        return (
            <div>
                <h1>{titleSearchPart && titleSearchPart.value || 'N/A'}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;