import { combineReducers } from "redux";
import Favorite from './favorite-reducer';
import Users from "./users-reducer";

const rootReducer = combineReducers({
    Favorite,
    Users
})

export default rootReducer;