import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function fetchThread(thread_id){
  return new Promise((resolve,reject)=>{
    window.fetch(`http://localhost:4000/thread/${thread_id}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}


export default function* fetchThreadWorker(action) {
  try {
      const posts = yield call(fetchThread, action.payload);
      yield put({type: "THREAD_FETCH_SUCCEEDED", payload: posts});
   } catch (e) {
      yield put({type: "THREAD_FETCH_FAILED", message: e.message});
   }
}

