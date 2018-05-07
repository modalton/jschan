import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function fetchBoards(){
  return new Promise((resolve,reject)=>{
    window.fetch("http://localhost:4000/boards")
    .then(res => res.json())
    .then(data => resolve(data))
      .catch(err => console.log('some error',err))
  })
}


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchUser(action) {
  console.log("action = ", action);
   try {
      const board = yield call(fetchBoards, action.payload);
      yield put({type: "BOARD_FETCH_SUCCEEDED", board: board});
   } catch (e) {
      yield put({type: "BOARD_FETCH_FAILED", message: e.message});
   }
}

export function* mySaga() {
  yield takeLatest("BOARD_FETCH_REQUESTED", fetchUser);
}
