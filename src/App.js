import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

    state = {
        value: ''
    };

    onChangeHandler = (event) => {
        this.setState({value: event.target.value})
    };

    charClickHandler = (index) => {
        const valueAsArray = this.state.value.split('');
        valueAsArray.splice(index, 1);
        this.setState({value: valueAsArray.join('')});
    };

    render() {

        const chars = this.state.value
            .split('')
            .map(
                (char, index) => <CharComponent
                    char={char}
                    click={() => this.charClickHandler(index)} />
            );

        return (
            <div className="App">
                <input onChange={this.onChangeHandler} value={this.state.value}/>
                <p>{this.state.value}</p>
                <ValidationComponent
                    length={this.state.value.length} />
                <div>
                    {chars}
                </div>
            </div>
        );
    }
}

export default App;
