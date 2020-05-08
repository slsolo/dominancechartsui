import {
    FETCH_FURS,
    FETCH_FURS_SUCCESS,
    ERROR
} from "./actions";
import {
    combineReducers
} from "redux";

const initialstate = {
    furs: [],
    fetching: false
}

function furReducer(state = initialstate, action) {
    switch (action.type) {
        case FETCH_FURS:
            return {
                ...state, fetching: true
            }
            case FETCH_FURS_SUCCESS:
                return {
                    ...state, furs: action.payload, fetching: false
                }
                case ERROR:
                    return {
                        ...state, fetching: false, furs: []
                    }
                    default:
                        return state;
    }
}

let RootReducer = combineReducers({
    furReducer
});
export default RootReducer;