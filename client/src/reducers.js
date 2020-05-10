import {
    FETCH_FURS,
    FETCH_FURS_SUCCESS,
    ERROR,
    COMPARE_FURS,
    COMPARE_FURS_SUCCESS
} from "./actions";
import {
    combineReducers
} from "redux";

const initialstate = {
    furs: [],
    fetching: false,
    err: "",
    comparison: "",
    comparisonFurs: {
        first: "",
        second: ""
    }
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
                        ...state, fetching: false, furs: [], err: action.payload
                    }
                    case COMPARE_FURS:
                        return {
                            ...state, fetching: true, comparisonFurs: action.payload, comparison: ""
                        }
                        case COMPARE_FURS_SUCCESS:
                            return {
                                ...state, fetching: false, comparisonFurs: {
                                    first: "",
                                    second: ""
                                }, comparison: action.payload
                            }
                            default:
                                return state;
    }
}

let RootReducer = combineReducers({
    furReducer
});
export default RootReducer;