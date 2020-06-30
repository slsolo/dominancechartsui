import {
    FETCH_FURS,
    FETCH_FURS_SUCCESS,
    ERROR,
    COMPARE_FURS,
    COMPARE_FURS_SUCCESS,
    FETCH_EYES,
    FETCH_EYES_SUCCESS
} from "./actions";
import {
    combineReducers
} from "redux";

const initialstate = {
    furs: [],
    eyes: [],
    fetching: false,
    err: "",
    comparison: "",
    comparisonItems: {
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
                            ...state, fetching: true, comparisonItems: action.payload, comparison: ""
                        }
                        case COMPARE_FURS_SUCCESS:
                            return {
                                ...state, fetching: false, comparisonItems: {
                                    first: "",
                                    second: ""
                                }, comparison: action.payload
                            }
                            case FETCH_EYES:
                                return {
                                    ...state, fetching: true
                                }
                                case FETCH_EYES_SUCCESS:
                                    return {
                                        ...state, eyes: action.payload, fetching: false
                                    }
                                    default:
                                        return state;
    }
}

let RootReducer = combineReducers({
    furReducer
});
export default RootReducer;