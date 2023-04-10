import { ethers } from 'ethers';

const RPC_URL_Mapping = {
    RPCForArbitrumMainnet: 'https://arb1.arbitrum.io/rpc',
    RPCForArbitrumMainnet_Write: 'https://arb1.arbitrum.io/rpc',
    RPCForArbitrumMainnetLocalForkNet: 'http://127.0.0.1:8545',
    RPCForArbitrumMainnetForkServerNet: 'https://arb-fork.musd.io',
};
const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.JsonRpcProvider(RPC_URL_Mapping.RPCForArbitrumMainnet);

export default {
    provider,
    RPCForArbitrumMainnet: RPC_URL_Mapping.RPCForArbitrumMainnet,
    RPCForArbitrumMainnetLocalForkNet: RPC_URL_Mapping.RPCForArbitrumMainnetLocalForkNet,
    RPCForArbitrumMainnetForkServerNet: RPC_URL_Mapping.RPCForArbitrumMainnetForkServerNet,

    defaultChain: {
        id: 0,
        code: '0x0',
        name: 'SUI',
        chainId: 42161,
        chainName: 'SUI',
        isTestChain: false,
        isLocalChain: false,
        multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
        multicall2Address: '0x80c7dd17b01855a6d2347444a0fcc36136a314de',
        getExplorerAddressLink: (address) => `https://arbiscan.io/address/${address}`,
        getExplorerTransactionLink: (transactionHash) => `https://arbiscan.io/tx/${transactionHash}`,
        rpcUrl: RPC_URL_Mapping.RPCForArbitrumMainnet,
        nativeCurrency: {
            name: 'Arbitrum ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        blockExplorerUrls: ['https://arbiscan.io/'],
        provider: RPC_URL_Mapping.RPCForArbitrumMainnet,
        partnerChainID: 1,
    },
    defaultChainForDev: {
        chainId: 421609,
        chainName: 'ARB Fork Server',
        isTestChain: true,
        isLocalChain: true,
        multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
        multicall2Address: '0x80c7dd17b01855a6d2347444a0fcc36136a314de',
        getExplorerAddressLink: (address) => `https://arbiscan.io/address/${address}`,
        getExplorerTransactionLink: (transactionHash) => `https://arbiscan.io/tx/${transactionHash}`,
        // Optional parameters:
        rpcUrl: RPC_URL_Mapping.RPCForArbitrumMainnetForkServerNet,
        blockExplorerUrl: 'https://arbiscan.io',
        nativeCurrency: {
            name: 'Arbitrum ETH',
            symbol: 'ETH',
            decimals: 18,
        },
    },
    chainConfigForLocalForkNet: {
        chainId: 421610,
        chainName: 'Arbitrum Fork',
        isTestChain: true,
        isLocalChain: true,
        multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
        multicall2Address: '0x80c7dd17b01855a6d2347444a0fcc36136a314de',
        getExplorerAddressLink: (address) => `https://arbiscan.io/address/${address}`,
        getExplorerTransactionLink: (transactionHash) => `https://arbiscan.io/tx/${transactionHash}`,
        // Optional parameters:
        rpcUrl: RPC_URL_Mapping.RPCForArbitrumMainnetLocalForkNet,
        blockExplorerUrl: 'https://arbiscan.io',
        nativeCurrency: {
            name: 'Arbitrum ETH',
            symbol: 'ETH',
            decimals: 18,
        },
    },

    tokenListURIUniswap: 'https://tokens.uniswap.org',

    expandTokens: [],

    // defaultApproveAllowance: '1000000000000000000',
    defaultApproveAllowance: '10000000000000000000000000000',
    // defaultApproveThreshold: '100000000000000000000000000',
    defaultApproveThreshold: '1000000000000000000000',

    maxNumberPickerValue: 9999999999,
    defaultDebounceWait: 500,

    popupWindowWidth: 576,
    popupWindowWidthForLiquidity: 620,
};
