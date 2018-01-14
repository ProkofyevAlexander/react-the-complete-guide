import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

    state = {
        users: [
            {username: 'Mark'},
            {username: 'Dan'},
        ]
    };

    eventHandler = (userIndex, event) => {
        const newState = {
            ...this.state,
            users: [...this.state.users]
        };
        newState.users[userIndex].username = event.target.value;
        this.setState(newState);
    };

    render() {
        return (
            <div className="App">
                <UserInput
                    eventHandler={this.eventHandler.bind(this, 0)}
                    username={this.state.users[0].username}/>
                <UserOutput username={this.state.users[0].username} text="Text for user 1"/>
                <UserInput
                    eventHandler={this.eventHandler.bind(this, 1)}
                    username={this.state.users[1].username}/>
                <UserOutput username={this.state.users[1].username} text="Text for user 2"/>
            </div>
        );
    }
}

export default App;
