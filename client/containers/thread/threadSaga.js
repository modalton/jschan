import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

//Fetching all Threads and Posts
function fetchThread(thread_id) {
  return new Promise((resolve, reject) => {
    window
      .fetch(`/thread/${thread_id}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function* fetchThreadWorker(action) {
  try {
    const posts = yield call(fetchThread, action.payload);
    yield put({ type: "THREAD_FETCH_SUCCEEDED", payload: posts });
  } catch (e) {
    yield put({ type: "THREAD_FETCH_FAILED", message: e.message });
  }
}

//Report a singular post
function reportPost({ post_id, reason }) {
  return new Promise((resolve, reject) => {
    window
      .fetch(`/report/`, {
        method: "POST",
        body: JSON.stringify({ post_id, reason }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function* reportPostWorker(action) {
  try {
    const success = yield call(reportPost, action.payload);
    yield put({ type: "REPORT_POST_SUCCEEDED", payload: success });
  } catch (e) {
    yield put({ type: "REPORT_POST_FAILED", message: e.message });
  }
}

export { fetchThreadWorker, reportPostWorker };
