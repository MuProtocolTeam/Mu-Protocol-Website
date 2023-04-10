import ApplicationConfig from '../ApplicationConfig';

export const ArbitrumForkChain = ApplicationConfig.chainConfigForLocalForkNet;
export const ArbitrumForkServerChain = ApplicationConfig.defaultChainForDev;
export const DefaultChain = ApplicationConfig.defaultChain;

export function toMainnetChainId(chainId) {
    let _chainId = chainId;
    switch (chainId) {
        case 421610:
            _chainId = 42161;
            break;
        case 421609:
            _chainId = 42161;
            break;
        case 10:
            _chainId = 1;
            break;
        default:
            _chainId = 42161;
    }
    return _chainId;
}
