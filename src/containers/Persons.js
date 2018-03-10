import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actionTypes';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor(Math.random() * 40)
        };
        this.props.onAddPerson(newPerson);
    };

    personDeletedHandler = (personId) => {
        this.props.onDeletePerson(personId);
    };

    render() {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler}/>
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPerson: (person) => dispatch({
            type: actionTypes.ADD_PERSON,
            person: person
        }),
        onDeletePerson: (id) => dispatch({
            type: actionTypes.DELETE_PERSON,
            personId: id
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
