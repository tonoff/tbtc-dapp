import React, { useEffect } from 'react'
import { withRouter } from 'react-router'

import { Footer, Header } from "./lib"
import { useWeb3React } from "@web3-react/core"
import { useDispatch } from "react-redux"
import { setEthereumAccount } from "../actions"

function App(props) {
  const { children, location } = props

  const dispatch = useDispatch()
  const { account } = useWeb3React()

  useEffect(() => {
    dispatch(setEthereumAccount(account))
  }, [account, dispatch])

  return (
    <div className="main">
      <div className="app">
        <Header />

        <div className="warning">
          <p>
            The safety of your funds is important to us.
          </p>
          <p>
            This dApp is in ALPHA and improper use may lead to LOSS OF FUNDS.
          </p>
          <p>
            For more information and options please{" "}
            <a href="https://discord.gg/Bpzfsgx">visit our Discord community</a>.
          </p>
        </div>

        { children }
      </div>
      <Footer includeSubscription={
        location.pathname === '/' ||
        location.pathname.startsWith('/news') // TODO: remove when proper CMS is selected
      } />
    </div>
  )
}

export default withRouter(App)
