import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers/authReducer";
import {messagesReducer} from "./messages/reducers/messagesReducer";

export default combineReducers({auth: authReducer, messages: messagesReducer});
