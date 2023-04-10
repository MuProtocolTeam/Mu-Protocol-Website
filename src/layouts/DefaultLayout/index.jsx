import React, { useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import 'antd/dist/antd.css';
import '../../assets/css/tailwind.css';

import './index.scss';
import '../../components/Icons/index.scss';
import '../../components/DAPPForm/index.scss';

import { Mainnet, Arbitrum, DAppProvider, DEFAULT_SUPPORTED_CHAINS, MetamaskConnector } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import WebThreeProvider from '../../components/WebThreeProvider/WebThreeProvider';
import { cacheDefaultTokens } from '../../contract/TokenContract';
import PageInfoProvider from '../../components/PageInfoProvider/PageInfoProvider';
import TransactionContextProvider from '../../components/Transaction/TransactionContextProvider';
import { ArbitrumForkChain, ArbitrumForkServerChain, DefaultChain } from '../../contract/ChainConfig';
import { getQueryValue } from '../../utils/URLUtil';
import ApplicationConfig from '../../ApplicationConfig';
import { getLocalStorage, saveToLocalStorage } from '../../utils/LocalStorage';
import { WalletConnectConnector } from '../../components/Wallet-Connect-Connector';
import { OKXConnector } from '../../components/Wallet-Connect-OKX-Connector';
import { WalletKitProvider } from "@mysten/wallet-kit";

const DAppReadOnlyUrlConfig = {
    [Arbitrum.chainId]: ApplicationConfig.RPCForArbitrumMainnet,
    // [Mainnet.chainId]: getDefaultProvider('mainnet'),
};

const DAppReadOnlyUrlConfigForWalletConnect = {
    [Arbitrum.chainId]: ApplicationConfig.RPCForArbitrumMainnet,
    [ArbitrumForkServerChain.chainId]: ApplicationConfig.RPCForArbitrumMainnetForkServerNet,
};

const DAppProviderConfig = {
    readOnlyChainId: DefaultChain.chainId,
    readOnlyUrls: DAppReadOnlyUrlConfig,
    networks: [...DEFAULT_SUPPORTED_CHAINS, ArbitrumForkChain, ArbitrumForkServerChain],

    noMetamaskDeactivate: true,

    connectors: {
        metamask: new MetamaskConnector(),
        okx: new OKXConnector(),
        walletConnect: new WalletConnectConnector({
            rpc: DAppReadOnlyUrlConfigForWalletConnect,
            qrcodeModalOptions: {
                mobileLinks: [
                    'metamask',
                    'okx',
                    'rainbow',
                    'argent',
                    'trust',
                    'imtoken',
                    'mathwallet',
                    'tokenPocket',
                    'defi wallet',
                ],
            },
        }),
    },
};

const enableLocalForkSessionKey = 'enableLocalFork';
const enableForkServerSessionKey = 'enableForkServer';

const DefaultLayout = ({ MainContentComponent, layout }) => {
    const config = useMemo(() => {
        let readOnlyUrlConfig = DAppReadOnlyUrlConfig;

        let isLocal = window.location.port === '9024';

        let enableLocalForkForLocal = isLocal;
        let enableLocalForkSession = getLocalStorage(enableLocalForkSessionKey);
        let enableLocalFork = getQueryValue('enable_local_fork');
        if (enableLocalFork) {
            if (enableLocalFork === 'false') {
                enableLocalForkForLocal = false;
                enableLocalFork = false;
                enableLocalForkSession = false;
                saveToLocalStorage(enableLocalForkSessionKey, false);
            } else {
                saveToLocalStorage(enableLocalForkSessionKey, true);
            }
        } else {
            if (enableLocalForkSession === 'false' || enableLocalForkSession === false) {
                enableLocalForkForLocal = false;
                enableLocalFork = false;
                enableLocalForkSession = false;
            }
        }

        if (enableLocalForkForLocal || enableLocalForkSession || enableLocalFork) {
            readOnlyUrlConfig = {
                ...readOnlyUrlConfig,
                [ArbitrumForkChain.chainId]: ApplicationConfig.RPCForArbitrumMainnetLocalForkNet,
            };
        }

        let enableForkServerForLocal = isLocal;
        let enableForkServerSession = getLocalStorage(enableForkServerSessionKey);
        let enableForkServer = getQueryValue('enable_fork_server');
        if (enableForkServer) {
            if (enableForkServer === 'false') {
                enableForkServerForLocal = false;
                enableForkServer = false;
                enableForkServerSession = false;
                saveToLocalStorage(enableForkServerSessionKey, false);
            } else {
                saveToLocalStorage(enableForkServerSessionKey, true);
            }
        } else {
            if (enableForkServerSession === 'false' || enableForkServerSession === false) {
                enableForkServerForLocal = false;
                enableForkServer = false;
                enableForkServerSession = false;
            }
        }

        if (enableForkServerForLocal || enableForkServerSession || enableForkServer) {
            readOnlyUrlConfig = {
                ...readOnlyUrlConfig,
                [ArbitrumForkServerChain.chainId]: ApplicationConfig.RPCForArbitrumMainnetForkServerNet,
            };
        }

        let dappConfig = {
            ...DAppProviderConfig,
            readOnlyUrls: readOnlyUrlConfig,
        };
        console.debug(`DAppProviderConfig => `, dappConfig);
        return dappConfig;
    }, []);

    useEffect(() => {
        cacheDefaultTokens();
    }, []);

    return (
        <WalletKitProvider>
            <WebThreeProvider>
                <PageInfoProvider>
                    <TransactionContextProvider>
                        <div className="main_container">
                            <Header layout={layout} />
                            <MainContentComponent />
                            <Footer layout={layout} />
                        </div>
                    </TransactionContextProvider>
                </PageInfoProvider>
            </WebThreeProvider>
        </WalletKitProvider>
    );
};

export default DefaultLayout;
