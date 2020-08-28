import React, { useCallback, useEffect, useMemo, useState } from "react"
import classnames from "classnames"
import { bindActionCreators } from "redux"
import { connect, useSelector } from "react-redux"

import { BitcoinHelpers } from "@keep-network/tbtc.js"

import StatusIndicator from '../svgs/StatusIndicator'
import TLogo from '../svgs/tlogo'
import Check from '../svgs/Check'
import X from '../svgs/X'
import {
  requestAvailableLotSizes,
  saveAddresses,
  selectRedeemLotSize,
} from '../../actions'

import web3 from "web3"
import { formatSatsToBtc } from "../../utils"
import LotSizeSelector from "../deposit/LotSizeSelector"

const verifyBtcAddress = (btcAddress) => {
  try {
    return BitcoinHelpers.Address.toScript(btcAddress)
  } catch (err) {
    console.log("Error parsing BTC address: ", btcAddress, err)
    return false
  }
}

export const useInput = ({ initial } = {}) => {
  const [value, setValue] = useState(initial || "")

  const onChange = useCallback((event) => {
    if (event && event.target) {
      setValue(event.target.value)
    } else {
      setValue(event)
    }
  }, [])

  return [value, onChange]
}

const useDeposit = () => {
  const [address, onChange] = useInput()

  return useMemo(() => {
    const valid = !address || web3.utils.isAddress(address)
    return {
      address,
      invalid: !valid,
      filled: !!address,
      empty: !address,
      valid,
      onChange,
    }
  }, [address, onChange])
}

const useBitcoin = () => {
  const [address, onChange] = useInput()

  return useMemo(() => {
    const valid = !address || verifyBtcAddress(address)
    return {
      address,
      invalid: !valid,
      filled: !!address,
      empty: !address,
      valid,
      onChange,
    }
  }, [address, onChange])
}

// eslint-disable-next-line react/prop-types
const StartFunc = ({
  availableLotSizes,
  selectRedeemLotSize,
  saveAddresses,
}) => {
  const deposit = useDeposit()
  const bitcoin = useBitcoin()

  const keeperAddress = useSelector((state) => state.redemption.depositAddress)

  useEffect(() => {
    keeperAddress && deposit.onChange(keeperAddress)
  }, [keeperAddress, deposit])

  const selectLotSize = useCallback(
    (lotSize) => {
      selectRedeemLotSize(lotSize)
    },
    [selectRedeemLotSize]
  )

  const onSubmit = useCallback(
    (event) => {
      saveAddresses({
        depositAddress: deposit.address,
        btcAddress: bitcoin.address,
      })
    },
    [deposit, bitcoin, saveAddresses]
  )

  return (
    <div className="redemption-start">
      <div className="page-top">
        <StatusIndicator donut>
          <TLogo height={100} width={100} />
        </StatusIndicator>
      </div>
      <div className="page-body">
        <div className="step">Step 1/6</div>
        <div className="title">Select Lot Size</div>
        <hr />

        <LotSizeSelector
          lotSizes={availableLotSizes}
          onSelect={selectLotSize}
        />

        <div className="description">
          <div
            className={classnames("paste-field", {
              success: deposit.valid,
              alert: deposit.invalid,
            })}
          >
            <label htmlFor="deposit-address">What was your TDT ID?</label>
            <input
              type="text"
              id="deposit-address"
              onChange={deposit.onChange}
              value={deposit.address}
              placeholder="Enter TDT ID"
            />
            {deposit.filled && deposit.valid && (
              <Check height="28px" width="28px" />
            )}
            {deposit.filled && deposit.invalid && (
              <X height="28px" width="28px" />
            )}
          </div>
          <div
            className={classnames("paste-field", {
              success: bitcoin.valid,
              alert: bitcoin.invalid,
            })}
          >
            <label htmlFor="btc-address">
              Where should we send your Bitcoin?
            </label>
            <input
              type="text"
              id="btc-address"
              onChange={bitcoin.onChange}
              value={bitcoin.address}
              placeholder="Enter BTC Address"
            />
            {bitcoin.filled && bitcoin.valid && (
              <Check height="28px" width="28px" />
            )}
            {bitcoin.filled && bitcoin.invalid && (
              <X height="28px" width="28px" />
            )}
          </div>
        </div>
        <div className="cta">
          <button
            onClick={onSubmit}
            disabled={!deposit.valid || !bitcoin.valid}
            className="black"
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ deposit, redemption }) => {
  return {
    depositAddress: redemption.depositAddress,
    availableLotSizes: deposit.availableLotSizes.map((ls) =>
      formatSatsToBtc(ls)
    ),
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveAddresses,
      selectRedeemLotSize,
      requestAvailableLotSizes,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartFunc)
