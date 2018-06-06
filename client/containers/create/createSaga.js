import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

//Create new thread
function newThread(payload){
  return new Promise((resolve,reject)=>{
    window.fetch(`http://localhost:4000/${payload.board}/createThread`,{
      method:'POST',
      body: payload.form
    })
      .then(res => res.json())
      .then(data => {console.log(data);return resolve(data);})
      .catch(err => reject(err));
  });
}

function* newThreadWorker(action) {
   try {
     const response = yield call(newThread, action.payload);
     yield put.resolve({type: "NEW_THREAD_SUCCEEDED", payload:response});
   } catch (e) {
     yield put({type: "NEW_THREAD_FAILED", message: e.message});
   }
}


//Create new comment
function newComment(payload){
  return new Promise((resolve,reject)=>{
    window.fetch(`http://localhost:4000/comment/${payload.thread_id}`,{
      method:'POST',
      body: payload.form
    })
      .then(res => res.json())
      .then(data => {console.log('dataum',data);return resolve(data);})
      .catch(err => reject(err));
  });
}

function* newCommentWorker(action) {
   try {
     const response = yield call(newComment, action.payload);
     yield put.resolve({type: "NEW_COMMENT_SUCCEEDED", payload:response});
   } catch (e) {
     yield put({type: "NEW_COMMENT_FAILED", message: e.message});
   }
}

export {newCommentWorker,newThreadWorker};
