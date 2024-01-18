/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox')
require('@nomicfoundation/hardhat-chai-matchers')
// require('@nomiclabs/hardhat-etherscan')
require('solidity-coverage')
require("hardhat-gas-reporter")
// require("hardhat-contract-sizer")
require('hardhat-deploy')
require('dotenv').config()

const NODEREAL_API_KEY = process.env.NODEREAL_API_KEY //  nodereal API key
const API_URL = process.env.API_URL
const OPBNB_RPC_URL = process.env.OPBNB_RPC_URL //OPBNB rpc url
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x" // api key
const BROWSER_URL = process.env.BROWSER_URL // browser url
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        opbnb: {
            url: OPBNB_RPC_URL, 
            chainId: 5611, // Replace with the correct chainId for the "opbnb" network
            accounts: [PRIVATE_KEY], // Add private keys or mnemonics of accounts to use 
            gasPrice: 20000000000,
        },
    },
    etherscan: {
        // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            opbnb: NODEREAL_API_KEY,
        },
        customChains: [
            {
             network: "opbnb",
             chainId: 5611, // Replace with the correct chainId for the "opbnb" network
             urls: {
               apiURL:  API_URL,
               browserURL: BROWSER_URL,
             },
            },
           ],
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
   
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
       
    },
    solidity: {
        compilers: [
            {
                version: "0.8.19",
            },
        ],
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
}
