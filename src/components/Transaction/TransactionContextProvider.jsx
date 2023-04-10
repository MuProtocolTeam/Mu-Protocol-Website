import React, { useMemo, useReducer, useState, useEffect } from 'react';
import TransactionContext from './TransactionContext';
import { TransactionDialogBox } from './TransactionDialogBox';

const defaultTransactionInfo = {
    state: '', // transaction state: [confirm|pending|success|failed|rejected]
    content: '',
    hash: '',
    onSuccess: () => {},
};

const convertTransactionStateToTransactionInfo = (state) => {
    let transactionInfo = {};

    let txContent = state?.txContent || '';
    let txType = state?.txType || '';
    let msg = state?.errorMessage || '';
    switch (state?.status) {
        case 'PendingSignature':
        case 'Submit':
            transactionInfo = {
                state: 'confirm',
                content: txContent,
                txType: txType,
            };
            break;
        case 'Mining':
            transactionInfo = {
                state: 'pending',
                content: txContent,
                txType: txType,
                hash: state?.transaction?.hash || '',
            };
            break;
        case 'Success':
            transactionInfo = {
                state: 'success',
                content: txContent,
                txType: txType,
                hash: state?.transaction?.hash || '',
                onSuccess: state?.onSuccess,
            };
            break;
        case 'Exception':
            transactionInfo = {
                state: msg.indexOf('rejected') >= 0 ? 'rejected' : 'failed',
                content: txContent,
                txType: txType,
                hash: state?.transaction?.hash || '',
            };
            break;
        default:
            transactionInfo = {
                state: '',
                content: '',
                txType: '',
                hash: '',
            };
    }

    return transactionInfo;
};

const reducer = (state, action) => {
    // console.debug(`transaction state => `, action);
    let transactionInfo = convertTransactionStateToTransactionInfo(action);
    return state.state === transactionInfo.state ? state : transactionInfo;
};

const TransactionContextProvider = (props) => {
    const [transactionInfo, dispatch] = useReducer(reducer, defaultTransactionInfo);
    const [openTransactionModal, setOpenTransactionModal] = useState(false);

    const contextWrapper = useMemo(
        () => ({
            transactionInfo: transactionInfo,
            dispatch: dispatch,
        }),
        [transactionInfo],
    );

    useEffect(() => {
        if (transactionInfo.state) {
            setOpenTransactionModal(true);

            if (transactionInfo.state === 'success') {
                transactionInfo.onSuccess && transactionInfo.onSuccess();
            }
        }
    }, [transactionInfo]);

    return (
        <TransactionContext.Provider value={contextWrapper}>
            <TransactionDialogBox
                open={openTransactionModal}
                onOpen={setOpenTransactionModal}
                transactionContext={transactionInfo}
            />
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;
