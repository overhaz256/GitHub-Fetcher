import { act } from '@testing-library/react';
import { RE_USER_STATE} from '../actions';

const initialSTATE = { isAuthenticated: Boolean,
}

function Users( state = initialSTATE, action){
    switch(action.type){
        case RE_USER_STATE:
            console.log('pay', action.payload)
            state.isAuthenticated = action.payload;
            return state;
        default:
            return state;
    }
}

export default Users;