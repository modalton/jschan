import {fork} from 'redux-saga/effects';

//import saga here
import {mySaga} from "./containers/home/homeSaga.js";
import myBoardSaga from "./containers/board/boardSaga.js";


function startSagas(...sagas) {
  return function* rootSaga() {
    yield sagas.map(saga => fork(saga))
  }
}

// add you imported saga to the function
export default startSagas(mySaga, myBoardSaga)
