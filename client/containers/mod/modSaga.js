import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function fetchBansRequest() {
  return new Promise((resolve, reject) => {
    window
      .fetch("/bans")
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

export default function* fetchBans(action) {
  try {
    const bans = yield call(fetchBansRequest, action.payload);
    yield put.resolve({ type: "BANS_FETCH_SUCCEEDED", payload: bans });
  } catch (e) {
    yield put({ type: "BANS_FETCH_FAILED", message: e.message });
  }
}
