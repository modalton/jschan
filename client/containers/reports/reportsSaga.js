import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

//Fetching all reports
function fetchReports(payload) {
  return new Promise((resolve, reject) => {
    window
      .fetch(`/reports`)
      .then(res => res.json())
      .then(data => {console.log('muh data',data);resolve(data)})
      .catch(err => reject(err));
  });
}

export default function* fetchReportsWorker(action) {
  try {
    const reports = yield call(fetchReports, action.payload);
    yield put({ type: "REPORTS_FETCH_SUCCEEDED", payload: reports });
  } catch (e) {
    yield put({ type: "REPORTS_FETCH_FAILED", message: e.message });
  }
}
