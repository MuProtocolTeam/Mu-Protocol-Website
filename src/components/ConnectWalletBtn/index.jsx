/**
 * @Author: DAPP
 * @Date:   2021-06-28 09:54:46
 * @Last Modified by:   DAPP
 * @Last Modified time: 2021-09-16 22:45:06
 */
import './index.scss';
import React, { useState } from 'react';
import WalletSelector from '../Modals/WalletSelector';
import { useEthers } from '@usedapp/core';

function ConnectWalletBtn({
    className = `text_center sub_btn_long sub_btn_long_default w-full`,
    txt = `Connect wallet`,
}) {
    const { activateBrowserWallet } = useEthers();

    const [openSelector, setOpenSelector] = useState(false);
    const onOpen = () => {
        if (window.ethereum || window.okxwallet) {
            setOpenSelector(true);
        } else {
            activateBrowserWallet({ type: 'walletConnect' });
        }
    };
    const onClose = () => {
        setOpenSelector(false);
    };

    return (
        <>
            <WalletSelector isOpen={openSelector} onClose={onClose} />
            <div
                className={className}
                onClick={() => {
                    onOpen();
                }}
            >
                {txt}
            </div>
        </>
    );
}

export default ConnectWalletBtn;
