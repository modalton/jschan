import { takeLatest } from "redux-saga/effects";

//import all sagas here
import homeSaga from "./containers/home/homeSaga.js";
import myBoardSaga from "./containers/catalog/CatalogSaga.js";
import {
  fetchThreadWorker,
  reportPostWorker
} from "./containers/thread/threadSaga.js";
import loginSaga from "./containers/login/loginSaga.js";
import modSaga from "./containers/mod/modSaga.js";
import {
  newCommentWorker,
  newThreadWorker
} from "./containers/create/createSaga.js";
import reportsSaga from "./containers/reports/reportsSaga.js";

export default function* allSagas() {
  yield takeLatest("CATALOG_FETCH_REQUESTED", myBoardSaga);
  yield takeLatest("BOARD_FETCH_REQUESTED", homeSaga);
  yield takeLatest("THREAD_FETCH_REQUESTED", fetchThreadWorker);
  yield takeLatest("REPORT_POST_REQUESTED", reportPostWorker);
  yield takeLatest("LOGIN_REQUESTED", loginSaga);
  yield takeLatest("BANS_REQUESTED", modSaga);
  yield takeLatest("NEW_THREAD_REQUESTED", newThreadWorker);
  yield takeLatest("NEW_COMMENT_REQUESTED", newCommentWorker);
  yield takeLatest("REPORTS_FETCH_REQUESTED", reportsSaga);
}
