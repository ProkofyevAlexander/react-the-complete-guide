import * as actionTypes from '../store/actionTypes';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            return {
                persons: state.persons.concat(action.person)
            };
        case actionTypes.DELETE_PERSON:
            return {
                persons: state.persons
                    .filter((person) => person.id !== action.personId)
            };
        default:
            return state;
    }
};

export default reducer;