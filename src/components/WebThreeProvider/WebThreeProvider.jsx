import React, { useState, useMemo, useEffect } from 'react';
import WebThreeContext from './WebThreeContext';
import ApplicationConfig from '../../ApplicationConfig';
import { generateAddressSummary } from '../../utils/StringFormat';
import { DefaultChain } from '../../contract/ChainConfig';
import {Connection, devnetConnection, JsonRpcProvider} from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";

const connection = new Connection({
    fullnode: 'https://fullnode.devnet.sui.io',
    faucet: 'https://faucet.devnet.sui.io/gas',
});
// connect to a custom RPC server
const provider = new JsonRpcProvider(devnetConnection);

const WebThreeProvider = (props) => {
    const { currentAccount } = useWalletKit();

    const contextWrapper = useMemo(
        () => {
            let account = currentAccount?.address;
            let chainName = `Sui`;

            if(currentAccount){
                let chains = currentAccount.chains;
                if(chains.length){
                    let network = chains[0].split(':')[1];
                    chainName = network;
                }
            }

            return {
                account: account || '',
                summaryAccount: generateAddressSummary(account, 6),
                chainId: 0,
                chainName: chainName,
                provider: provider,
            };
        },
        [currentAccount],
    );

    useEffect(() => {
        console.debug(`current connection info: account => `, currentAccount);
    }, [currentAccount]);

    return <WebThreeContext.Provider value={contextWrapper}>{props.children}</WebThreeContext.Provider>;
};

export default WebThreeProvider;
