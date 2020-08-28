import { takeLatest } from "redux-saga/effects"

import {
  restoreDepositState,
  restoreRedemptionState,
  requestAvailableLotSizes,
  requestADeposit,
} from "./deposit"

import {
  saveAddresses,
  requestRedemption,
  requestTdtAddress,
} from "./redemption"
import {
  RESTORE_DEPOSIT_STATE,
  RESTORE_REDEMPTION_STATE,
  REQUEST_AVAILABLE_LOT_SIZES,
  REQUEST_A_DEPOSIT,
  SAVE_ADDRESSES,
  REQUEST_REDEMPTION,
  SELECT_REDEEM_LOT_SIZE,
  SET_ETHEREUM_ACCOUNT,
} from "../actions"

export default function* () {
  yield takeLatest(RESTORE_DEPOSIT_STATE, restoreDepositState)
  yield takeLatest(RESTORE_REDEMPTION_STATE, restoreRedemptionState)
  yield takeLatest(REQUEST_AVAILABLE_LOT_SIZES, requestAvailableLotSizes)
  yield takeLatest(SET_ETHEREUM_ACCOUNT, requestAvailableLotSizes)
  yield takeLatest(REQUEST_A_DEPOSIT, requestADeposit)
  yield takeLatest(SAVE_ADDRESSES, saveAddresses)
  yield takeLatest(REQUEST_REDEMPTION, requestRedemption)
  yield takeLatest(SELECT_REDEEM_LOT_SIZE, requestTdtAddress)
}
