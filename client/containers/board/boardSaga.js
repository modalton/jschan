import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function fetchCatalog(board){
  return new Promise((resolve,reject)=>{
    window.fetch(`http://localhost:4000/${board}/catalog`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}


export default function* fetchCatalogWorker(action) {
  try {
      const catalog = yield call(fetchCatalog, action.payload);
      yield put({type: "CATALOG_FETCH_SUCCEEDED", payload: catalog});
   } catch (e) {
      yield put({type: "CATALOG_FETCH_FAILED", message: e.message});
   }
}

