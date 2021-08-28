
import { ethers } from 'ethers';
// import axios from 'axios';
// import Web3Modal from 'web3modal';

import {
  call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';

import {
  EXTEND_EXPIRY_TIME
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

function* employerSaga() {
  // yield takeLatest(BUY_NFT, buyNFT);
}

export default employerSaga;