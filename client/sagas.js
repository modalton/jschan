import {takeLatest} from 'redux-saga/effects';

//import all sagas here
import homeSaga from "./containers/home/homeSaga.js";
import myBoardSaga from "./containers/board/boardSaga.js";

export default function* allSagas() {
  yield takeLatest("CATALOG_FETCH_REQUESTED", myBoardSaga);
  yield takeLatest("BOARD_FETCH_REQUESTED", homeSaga);
}
