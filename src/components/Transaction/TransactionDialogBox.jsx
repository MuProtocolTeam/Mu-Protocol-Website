import './index.scss';

import React, { useState, useEffect, useContext, useMemo } from 'react';
import ConditionDisplay from '../ConditionDisplay';
import CopyAddress from '../CopyAddress';
import ViewOnEtherscan from '../ViewOnEtherscan';
import { Modal } from 'antd';
import WebThreeContext from '../WebThreeProvider/WebThreeContext';
import { generateAddressSummary } from '../../utils/StringFormat';
import ContractConfig from '../../contract/ContractConfig';

export function TransactionDialogBox({ open, onOpen, transactionContext }) {
    const web3Context = useContext(WebThreeContext);

    const [titleIcon, setTitleIcon] = useState('title_icon_confirm');
    const [title, setTitle] = useState('Confirm transaction on your wallet');
    const [content, setContent] = useState('Confirm transaction on your wallet');

    const [confirmed, setConfirmed] = useState(false);

    const connectedWalletName = useMemo(() => {
        if (window.localStorage && open) {
            let _lastWalletName = window.localStorage.getItem('CURRENT_WALLET_NAME') || 'MetaMask';
            return _lastWalletName;
        }

        return 'MetaMask';
    }, [open]);

    const onClose = () => {
        onOpen(false);
    };

    useEffect(() => {
        if (transactionContext?.state === 'confirm') {
            setConfirmed(false);
            setTitleIcon('title_icon_confirm');
            setTitle('Confirm transaction on your wallet');
            setContent(transactionContext?.content || 'Confirm transaction on your wallet');
        }

        if (transactionContext?.state === 'pending') {
            setConfirmed(true);
            setTitleIcon('title_icon_pending');
            setTitle('Transaction Submitted');
            setContent(transactionContext?.content || '');
        }

        if (transactionContext?.state === 'success') {
            setConfirmed(true);
            setTitleIcon('title_icon_success');
            setTitle('Transaction Successful');
            setContent(transactionContext?.content || '');
        }

        if (transactionContext?.state === 'failed') {
            setConfirmed(false);
            setTitleIcon('title_icon_failed');
            setTitle('Transaction Failure');
            setContent(transactionContext?.content || '');
        }

        if (transactionContext?.state === 'rejected') {
            setConfirmed(false);
            setTitleIcon('title_icon_failed');
            setTitle('Transaction Rejected');
            setContent(transactionContext?.content || '');
        }
    }, [transactionContext?.state]);

    return (
        <Modal
            title=""
            footer={null}
            open={open}
            width={576}
            onCancel={() => onOpen(false)}
            className={'overlay_container common_modal transaction_dialog'}
        >
            <div className={'f_c_c_c w-full'}>
                <div className={`title_icon ${titleIcon}`} />
                <div className={'content_title'}>{title}</div>

                <ConditionDisplay display={transactionContext?.state === 'confirm' && web3Context.account}>
                    <div className={'d_content'}>{content}</div>

                    <div className={'d_operation_box d_confirm_box'}>
                        <div className={'wallet'}>
                            <div className={`i_icon_24 i_metamask`} />
                            <div className={'connection'}>
                                <div className={'wallet_name'}>{connectedWalletName}</div>
                                <div className={'wallet_add'}>{generateAddressSummary(web3Context.account, 6)}</div>
                            </div>
                        </div>
                        <div className={'status'}>
                            <div className={'dot'} />
                            <div className={'txt'}>Connected</div>
                        </div>
                    </div>
                </ConditionDisplay>

                <ConditionDisplay display={confirmed}>
                    <div className={'d_operation_box d_hash_box'}>
                        <div className={'hash'}>{generateAddressSummary(transactionContext?.hash, 12)}</div>
                        <div className={'operations'}>
                            <CopyAddress address={transactionContext?.hash} />
                            <ViewOnEtherscan
                                url={`${ContractConfig.etherscan(web3Context.chainId)}/tx/${transactionContext?.hash}`}
                                showTitle={true}
                            />
                        </div>
                    </div>

                    <ConditionDisplay display={!transactionContext?.error}>
                        <button
                            type="primary"
                            size="small"
                            className="f_r_c sub_btn_long_blue close_btn"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </ConditionDisplay>
                </ConditionDisplay>

                <ConditionDisplay
                    display={transactionContext?.state === 'failed' || transactionContext?.state === 'rejected'}
                >
                    <button type="primary" size="small" className="f_r_c sub_btn_long_red close_btn" onClick={onClose}>
                        Close
                    </button>
                </ConditionDisplay>
            </div>
        </Modal>
    );
}
