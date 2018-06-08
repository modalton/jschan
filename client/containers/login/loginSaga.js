import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function attemptLoginRequest(payload) {
  return new Promise((resolve, reject) => {
    window
      .fetch("/mods/auth", {
        method: "POST",
        body: JSON.stringify({
          username: payload.username,
          password: payload.password
        }),
        headers: { "content-type": "application/json" }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return resolve(data);
      })
      .catch(err => {
        console.log("muh errror", err);
        reject(err);
      });
  });
}

export default function* attemptLogin(action) {
  try {
    const user = yield call(attemptLoginRequest, action.payload);
    yield put.resolve({ type: "LOGIN_SUCCEEDED", payload: user });
  } catch (e) {
    yield put({ type: "LOGIN_FAILED", message: e.message });
  }
}
