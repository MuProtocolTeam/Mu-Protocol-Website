import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useContractFunction, useCall, useCalls } from '@usedapp/core';
import { Contract, providers } from 'ethers';
import WebThreeContext from '../WebThreeProvider/WebThreeContext';
import TransactionContext from '../Transaction/TransactionContext';
import ERC20Token_abi from '../../contract/abi/ERC20Token_abi';
import { DefaultChain } from '../../contract/ChainConfig';

/**
 * send a new transaction
 * @param contract
 * @param sendMethod
 * @param txContent
 * @param txOptions
 * @param txType    REC20|CONTRACT_INTERACTION
 * @param onSuccess
 * @returns {{state: import("..").TransactionStatus, send: send}}
 */
export function useContractSend(contract, sendMethod, txContent, txOptions, txType, onSuccess) {
    const transactionContext = useContext(TransactionContext);
    const { state, send: doSend, events } = useContractFunction(contract, sendMethod, txOptions || {});

    const send = (...args) => {
        console.debug(`send proxy...`);
        transactionContext.dispatch({
            status: 'Submit',
            txContent: txContent,
        });
        doSend(...args);
    };

    useEffect(() => {
        // console.debug(`current tx state => `, state, `events => `, events);
        transactionContext.dispatch({
            ...state,
            txContent: txContent,
            txType: txType,
            onSuccess: () => {
                onSuccess && onSuccess(events);
            },
        });
    }, [state]);

    return { state, send };
}

export function useConfiguredContract(configuredContract) {
    const web3Context = useContext(WebThreeContext);
    const contractAddress =
        configuredContract?.theAddress ||
        (configuredContract?.address && configuredContract.address(web3Context.chainId)) ||
        undefined;
    const contract = contractAddress && new Contract(contractAddress, configuredContract?.abi);
    return contract;
}

/**
 * Fetch contract from ContractConfig, and send a transaction
 * @param configuredContract
 * @param sendMethod
 * @param txContent
 * @param txOptions
 * @param onSuccess
 * @returns {{state: import("..").TransactionStatus, send: (...args: Params<TypedContract, ContractFunctionNames<T>>) => Promise<TransactionReceipt | undefined>}}
 */
export function useConfiguredContractSend(configuredContract, sendMethod, txContent, txOptions, onSuccess) {
    const contract = useConfiguredContract(configuredContract);
    return useContractSend(contract, sendMethod, txContent, txOptions, 'CONTRACT_INTERACTION', onSuccess);
}

export function useTokenContractSend(tokenAddress, sendMethod, txContent, txOptions, onSuccess) {
    const tokenContract = new Contract(tokenAddress, ERC20Token_abi);
    return useContractSend(tokenContract, sendMethod, txContent, txOptions, 'REC20', onSuccess);
}

const buildDefaultProvider = (web3Context) => {
    return undefined;
    // TODO need to extend here, to support multi chains.
    // if(web3Context.account){
    //     return undefined;
    // }
    //
    // let provider = new providers.StaticJsonRpcProvider(
    //     DefaultChain.rpcUrl,
    //     {
    //         chainId: DefaultChain.chainId,
    //         name: DefaultChain.chainName,
    //     }
    // );
    // // console.debug(`created default provider => `, provider);
    // return provider;
};

/**
 * call contract function and fetch data
 * @param configuredContract
 * @param callMethod
 * @param args
 * @returns {*}
 */
export function useContractCall(configuredContract, callMethod, args) {
    const web3Context = useContext(WebThreeContext);
    const contractAddress =
        configuredContract?.theAddress ||
        (configuredContract?.address && configuredContract.address(web3Context.chainId)) ||
        undefined;

    const provider = contractAddress && buildDefaultProvider(web3Context);
    const { value, error } =
        useCall(
            contractAddress && {
                contract: new Contract(contractAddress, configuredContract.abi, provider),
                method: callMethod,
                args: args ?? [],
            },
        ) ?? {};

    if (error) {
        console.error(error.message);
        return undefined;
    }
    return value;
}

/**
 * e.g
 *  1.  const getPositionIdsCallsResult = useContractCalls({
            contract: ContractConfig.Uniswap.PositionManager,
            callMethod: 'tokenOfOwnerByIndex',
            args: [web3Context.account, 0]
        },{
            contract: ContractConfig.Uniswap.PositionManager,
            callMethod: 'tokenOfOwnerByIndex',
            args: [web3Context.account, 1]
        });
 *  2. const getPositionIdsCallsResult = useContractCalls([{
            contract: ContractConfig.Uniswap.PositionManager,
            callMethod: 'tokenOfOwnerByIndex',
            args: [web3Context.account, 0]
        },{
            contract: ContractConfig.Uniswap.PositionManager,
            callMethod: 'tokenOfOwnerByIndex',
            args: [web3Context.account, 1]
        }]);
 *
 * @param calls
 * @returns {*}
 */
export function useContractCalls(...calls) {
    const web3Context = useContext(WebThreeContext);

    let __calls = calls && calls.length && calls[0] instanceof Array ? calls[0] : calls;

    let _calls =
        __calls?.map((call) => {
            let contractAddress =
                call?.contract?.theAddress ||
                (call?.contract?.address && call?.contract.address(web3Context.chainId)) ||
                undefined;
            let provider = contractAddress && buildDefaultProvider(web3Context);
            return (
                contractAddress && {
                    contract: new Contract(contractAddress, call?.contract?.abi, provider),
                    method: call?.callMethod,
                    args: call?.args ?? [],
                }
            );
        }) ?? [];
    _calls = _calls.filter((call) => call);

    const callsResult = useCalls(_calls) ?? [];

    return useMemo(() => {
        if (callsResult.length === 0) {
            return [];
        }

        return callsResult.map((result) => {
            return result?.value || {};
        });
    }, [callsResult]);
}



export const useGetObject = (objectId) => {
    const web3Context = useContext(WebThreeContext);
    const [result, setResult] = useState(null);

    useEffect(() => {
        web3Context.provider.getObject({
            id: objectId,
            options: { showContent: true },
        }).then((_result) => {
            let data = _result.data.content.fields;
            console.debug(`getObject: result =>`, _result, `data =>`, data);

            setResult(data);
        });
    }, [objectId]);

    return result;
};