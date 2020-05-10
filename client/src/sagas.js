import {
  FETCH_FURS,
  FETCH_FURS_SUCCESS,
  ERROR,
  COMPARE_FURS,
  COMPARE_FURS_SUCCESS
} from "./actions";
import {
  call,
  put,
  takeLatest,
  all,
  fork
} from "redux-saga/effects";

function* compareFurs(action) {
  try {
    const response = yield call(fetch, "https://solo-development-web.herokuapp.com/furs/", {
      mode: "cors",
      method: "POST",
      body: action.payload,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = yield response.text();
    yield put({
      type: COMPARE_FURS_SUCCESS,
      payload: result
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}

function* fetchFurs() {
  try {
    const response = yield call(
      fetch,
      "https://solo-development-web.herokuapp.com/furs/", {
        mode: "cors",
      }
    );
    const furs = yield response.json();
    console.log(furs);
    yield put({
      type: FETCH_FURS_SUCCESS,
      payload: furs,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}

function* watchCompareFurs() {
  yield takeLatest(COMPARE_FURS, compareFurs);
}

function* watchFetchFurs() {
  yield takeLatest(FETCH_FURS, fetchFurs);
}

function* mySaga() {
  yield all([fork(watchFetchFurs), fork(watchCompareFurs)]);
}

export default mySaga;