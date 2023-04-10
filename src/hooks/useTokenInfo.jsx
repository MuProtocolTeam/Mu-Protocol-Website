import { useMemo } from 'react';
import WETHLogo from '../components/Coin/img/token_weth.svg';
import USDCLogo from '../components/Coin/img/token_usdc.svg';
import ContractConfig from '../contract/ContractConfig';
import { useContractCalls } from '../components/ContractHooks';
import DefaultLogo from '../components/Coin/img/token_default.svg';
import { chainLocalNameMap } from 'components/WebThreeProvider/WebThreeProvider';
import { useCoingeckoTokenPrices } from '../components/TokenPrice';
import { DefaultChain, toMainnetChainId } from '../contract/ChainConfig';
import { useTokenList } from '@usedapp/core';
import ApplicationConfig from '../ApplicationConfig';
import { ERCToken } from '../components/ERCToken';

export const DappTokenLogosMap = {
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1': WETHLogo,
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8': USDCLogo,
};

export const useTokenInfoCache = (chainId, ..._address) => {
    let addresses = _address && _address.length && _address[0] instanceof Array ? _address[0] : _address;

    const getSymboCalls =
        (addresses &&
            addresses.map((theAddress) => {
                let contract = {
                    ...ContractConfig.asset.ERC20,
                    theAddress: theAddress,
                };
                return {
                    contract: contract,
                    callMethod: 'symbol',
                };
            })) ??
        [];
    const getSymboCallsResult = useContractCalls(getSymboCalls) ?? [];

    const getDecimalsCalls =
        (addresses &&
            addresses.map((theAddress) => {
                let contract = {
                    ...ContractConfig.asset.ERC20,
                    theAddress: theAddress,
                };
                return {
                    contract: contract,
                    callMethod: 'decimals',
                };
            })) ??
        [];
    const getDecimalsCallsResult = useContractCalls(getDecimalsCalls) ?? [];

    const logos = useTokenLogoFromUniswap(chainId, addresses);

    const platform = chainLocalNameMap[chainId]?.coingeckoLocalName || 'arbitrum-one';
    const tokenPrices =
        useCoingeckoTokenPrices(addresses, {
            quote: 'usd',
            platform: platform,
        }) ?? [];
    const tokenInfos =
        useMemo(() => {
            // console.debug(`useTokenInfoCache => `, addresses, getSymboCallsResult, getDecimalsCallsResult, logos);

            if (addresses && getSymboCallsResult.length && getDecimalsCallsResult.length && logos.length) {
                let tokens = addresses.map((theAddress, index) => {
                    let tokenName = getSymboCallsResult[index] && getSymboCallsResult[index][0];
                    let decimals = getDecimalsCallsResult[index] && getDecimalsCallsResult[index][0];

                    if (tokenName && decimals) {
                        return new ERCToken({
                            chainId: chainId,
                            address: theAddress,
                            currentMarketPrice: tokenPrices[index],
                            name: tokenName,
                            symbol: tokenName,
                            logoURI: logos[index],
                            decimals: decimals,
                        });
                    } else {
                        return {};
                    }
                });
                // console.debug(`useTokenInfoCache => `, tokens);
                return tokens;
            }
            return [];
        }, [addresses, tokenPrices, getSymboCallsResult, getDecimalsCallsResult, logos]) ?? [];

    return _address && _address.length === 1 && !(_address[0] instanceof Array) && tokenInfos.length
        ? tokenInfos[0]
        : tokenInfos;
};

export const useTokenLogo = (tokenAddress) => {
    return DappTokenLogosMap[tokenAddress.toLocaleLowerCase()] || DefaultLogo;
};

export const useTokenLogoFromUniswap = (chainId, ..._address) => {
    let addresses = _address && _address.length && _address[0] instanceof Array ? _address[0] : _address;

    const _chainId = toMainnetChainId(chainId || DefaultChain.chainId);
    const { tokens } = useTokenList(ApplicationConfig.tokenListURIUniswap, _chainId) ?? [];

    const logos =
        useMemo(() => {
            // console.debug(`tokens`, tokens);

            if (tokens && tokens.length) {
                let _logos = addresses.map((address) => {
                    if (!address) {
                        return DefaultLogo;
                    }

                    if (DappTokenLogosMap[address.toLocaleLowerCase()]) {
                        return DappTokenLogosMap[address.toLocaleLowerCase()];
                    }

                    let _tokens = tokens.filter((t) => t.address.toLocaleLowerCase() === address.toLocaleLowerCase());
                    if (_tokens.length) {
                        return _tokens[0].logoURI;
                    } else {
                        return DefaultLogo;
                    }
                });

                return _logos;
            }

            return [];
        }, [tokens, addresses]) ?? [];
    return logos;
};
