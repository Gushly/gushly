
import { ethers } from 'ethers';
import firebase
  from '../components/firebase/firebase';
// import axios from 'axios';
// import Web3Modal from 'web3modal';

import {
  call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';

import {
  FETCH_ENGAGEMENTS, SET_ENGAGEMENTS
} from '../constants/actionTypes';

function* extendExpiryTime(action) {
  // try {
  //   yield put({ type: BUY_NFT_IN_PROGRESS });
  //   const response = yield handleBuyNFT(action.payload);
  //   console.log(response);
  //   yield put({ type: BUY_NFT_SUCCESS, payload: response });
  // } catch (e) {
  //   console.log(e);
  //   yield put({ type: BUY_NFT_ERROR, message: e.message });
  // }
}

function* fetchEngagements(action) {
  try {
    const user = JSON.parse(localStorage.getItem('authUser'))

    if (user) {
      console.log(user)
      const { email } = user;
      const engagements = yield call(firebase.getEngagementsByClientEmail, email)
      console.log("test", engagements)
      yield put({ type: SET_ENGAGEMENTS, payload: engagements })
      console.log("done");
    }
  } catch (err) {
    console.error(err)
  }
}

function* employerSaga() {
  yield takeLatest(FETCH_ENGAGEMENTS, fetchEngagements);
}

export default employerSaga;