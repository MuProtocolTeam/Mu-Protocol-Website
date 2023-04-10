import ApplicationConfig from '../ApplicationConfig';
import { getLocalStorage, saveToLocalStorage } from '../utils/LocalStorage';
import ContractAddressConfig_Arbitrum from './ContractAddressConfig_Arbitrum';
import ContractAddressConfig_Mainnet from './ContractAddressConfig_Mainnet';
import WETHLogo from '../components/Coin/img/token_weth.svg';
import ETHLogo from '../components/Coin/img/token_eth.svg';

const TOKEN_LOCAL_STORAGE_KEY = 'DAPP_TOKENS_IN_LOCAL_STORAGE';

export function getToken(_token, _chainId) {
    if (!_token) {
        return {};
    }

    let token = _token.toLocaleLowerCase();
    let chainId = _chainId || ApplicationConfig.defaultChain.id;
    let tokens = getLocalStorage(TOKEN_LOCAL_STORAGE_KEY);
    if (!tokens || !tokens[chainId] || !tokens[chainId][token]) {
        console.error(`The token[name=${_token}, chainId=${_chainId}] is not found!`);
        return {};
    }

    return tokens[chainId][token];
}

export function cacheToken(_token, _address, _chainId, _decimals) {
    if (!_token || !_address) {
        console.error(`The token name and address can not be empty!`);
        return;
    }

    let token = _token.toLocaleLowerCase();
    let decimals = _decimals || 18;
    let chainId = _chainId || ApplicationConfig.defaultChain.id;

    let contractConfig = {
        name: _token,
        address: _address,
        chainId: chainId,
        decimals: decimals,
    };

    let cache = getLocalStorage(TOKEN_LOCAL_STORAGE_KEY) || {};
    let chainCache = cache[chainId] || {};
    chainCache[token] = contractConfig;
    chainCache[_address.toLocaleLowerCase()] = contractConfig;
    cache[chainId] = chainCache;

    saveToLocalStorage(TOKEN_LOCAL_STORAGE_KEY, cache);
}

export function cacheDefaultTokens() {
    // cacheToken('GMX', ContractAddressConfig_Arbitrum.asset.GMX, arbitrum);
    // cacheToken('GMX', ContractAddressConfig_Arbitrum.asset.GMX, arbitrumFork);
    // cacheToken('GMX', ContractAddressConfig_Arbitrum.asset.GMX, arbitrumForkServer);

    cacheToken('mUSD', 'undefined', ApplicationConfig.defaultChain.id, 6);
    cacheToken('COLLATERAL', 'undefined', ApplicationConfig.defaultChain.id, 9);
}

export const WrappedTokens = [
    {
        wrappedName: 'WETH',
        wrappedLogo: WETHLogo,
        nativeName: 'ETH',
        nativeLogo: ETHLogo,
    },
];

export const checkWrappedToken = (token) => {
    let filter = WrappedTokens.filter((wrappedToken) => {
        return wrappedToken.wrappedName === token;
    });

    return filter.length > 0;
};
