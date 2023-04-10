/**
 * @Author: DAPP
 * @Date:   2021-06-17 15:43:43
 * @Last Modified by:   DAPP
 * @Last Modified time: 2021-07-12 21:05:43
 */
import ApplicationConfig from '../ApplicationConfig';
import ContractAddressConfig_Mainnet from './ContractAddressConfig_Mainnet';
import ContractAddressConfig_Arbitrum from './ContractAddressConfig_Arbitrum';
import ContractAddressConfig_ArbitrumFork from './ContractAddressConfig_ArbitrumFork';

import ERC20Token_abi from './abi/ERC20Token_abi';

const ChainAddressMap = {
    0: {
        name: 'Mainnet',
        addressConfig: ContractAddressConfig_Mainnet,
    },
    1: {
        name: 'Mainnet',
        addressConfig: ContractAddressConfig_Mainnet,
    },
    42161: {
        name: 'Arbitrum',
        addressConfig: ContractAddressConfig_Arbitrum,
    },
    '0xa4b1': {
        name: 'Arbitrum',
        addressConfig: ContractAddressConfig_Arbitrum,
    },
    421610: {
        name: 'ArbitrumFork',
        addressConfig: ContractAddressConfig_ArbitrumFork,
    },
    '0x66eea': {
        name: 'ArbitrumFork',
        addressConfig: ContractAddressConfig_ArbitrumFork,
    },
    421609: {
        name: 'ARB Fork Server',
        addressConfig: ContractAddressConfig_ArbitrumFork,
    },
    '0x66ee9': {
        name: 'ARB Fork Server',
        addressConfig: ContractAddressConfig_ArbitrumFork,
    },
};

const getChainAddress = (chainId) => {
    let _chainId = chainId || ApplicationConfig.defaultChain.id;
    return ChainAddressMap[_chainId] && ChainAddressMap[_chainId].addressConfig;
};

const ContractConfig = {
    etherscan: (chainId) => {
        let _chainId = chainId || ApplicationConfig.defaultChain.id;
        return ChainAddressMap[_chainId] && ChainAddressMap[_chainId].addressConfig.etherscan;
    },
    asset: {
        ERC20: {
            name: 'ERC20 Token',
            abi: ERC20Token_abi,
        },
        /**
         * get asset config. e.g.:
         *      ContractConfig.asset.getAsset('SPA')
         *      ContractConfig.asset.getAsset('ETH-SPA@Uniswap')
         * @param name
         */
        getAsset: (name) => {
            if (name.indexOf('@') > 0) {
                let dexName = name.split('@')[1];
                return ContractConfig.asset[`LP_${dexName}`];
            } else {
                return ContractConfig.asset[name];
            }
        },
    },

};

export default ContractConfig;
