import React, { useEffect } from 'react'
import Web3 from 'web3'
import TBTC from '@keep-network/tbtc.js'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import config from '../config/config.json'
import { tbtcLoaded } from '../actions'

/**
 * @typedef {Object} Deferred
 * @property {(value) => void} resolve - A function to resolve the promise.
 * @property {(error) => void} reject - A function to reject the promise.
 * @property {Promise} promise - The promise whose resolution is deferred.
 */
/**
 * Deferred is a Promise that can be resolved,
 * at a later point in time.
 * @return {Deferred} A deferred promise.
 */
function Deferred() {
    let resolve
    let reject

    const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
    })

    return {
        promise,
        reject,
        resolve
    }
}

let Web3LoadedDeferred = new Deferred()
let TBTCLoadedDeferred = new Deferred()

export let Web3Loaded = Web3LoadedDeferred.promise
export let TBTCLoaded = TBTCLoadedDeferred.promise

// const isMainNet = async (web3) => {
//   return "main" === (await web3.eth.net.getNetworkType())
// }

const initializeContracts = async (web3, connector, onTBTCLoaded) => {
    // Initialise default account.
    web3.eth.defaultAccount = await connector.getAccount()
    // Log the netId/chainId.
    const netId = await web3.eth.net.getId()
    const chainId = await web3.eth.getChainId()
    console.debug(`netId: ${netId}\nchainId: ${chainId}`)

    Web3LoadedDeferred.resolve(web3)

    const tbtc = await TBTC.withConfig({
        web3: web3,
        bitcoinNetwork: "testnet",
        electrum: config.electrum
    })

    TBTCLoadedDeferred.resolve(tbtc)

    onTBTCLoaded(chainId, tbtc.config.bitcoinNetwork)
}

function instantiateWeb3(provider, connector) {
    return new Web3(provider)
}

let Web3ReactManager = ({ children, tbtcLoaded }) => {
    const { active, library, connector } = useWeb3React()

    useEffect(() => {
        if(active) {
            initializeContracts(library, connector, tbtcLoaded)
        }
    }, [active, connector, library, tbtcLoaded])

    // Watch for changes:
    // provider = this.state.web3.eth.currentProvider
    // provider.on('networkChanged', this.getAndSetAccountInfo)
    // provider.on('accountsChanged', this.getAndSetAccountInfo)

    return children
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
    { tbtcLoaded }, dispatch
)

Web3ReactManager = connect(
    null,
    mapDispatchToProps
)(Web3ReactManager)

const Web3Wrapper = ({ children }) => {
    return <Web3ReactProvider getLibrary={instantiateWeb3}>
        <Web3ReactManager>
            {children}
        </Web3ReactManager>
    </Web3ReactProvider>
}

export default Web3Wrapper
