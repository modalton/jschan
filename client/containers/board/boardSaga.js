import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function fetchCatalog(board){
  return new Promise((resolve,reject)=>{
    window.fetch(`http://localhost:4000/${board}/catalog`)
    .then(res => res.json())
      .then(data => {resolve(data); console.log('git',data)})
      .catch(err => reject(err))
  })
}


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchCatalogWorker(action) {
  try {
    console.log('muh action',action)
      const catalog = yield call(fetchCatalog, action.payload);
      yield put({type: "BOARD_CATALOG_FETCH_SUCCEEDED", catalog: catalog});
   } catch (e) {
      yield put({type: "BOARD_CATALOG_FETCH_FAILED", message: e.message});
   }
}

export function* myBoardSaga() {
  yield takeLatest("BOARD_CATALOG_FETCH_REQUESTED", fetchCatalogWorker);
}
