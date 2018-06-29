import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

//Also often used by other components than home
function fetchBoards() {
  return new Promise((resolve, reject) => {
    window
      .fetch("/boards")
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

export default function* fetchUser(action) {
  try {
    const boards = yield call(fetchBoards, action.payload);
    yield put.resolve({ type: "BOARD_FETCH_SUCCEEDED", payload: boards });
  } catch (e) {
    yield put({ type: "BOARD_FETCH_FAILED", message: e.message });
  }
}
