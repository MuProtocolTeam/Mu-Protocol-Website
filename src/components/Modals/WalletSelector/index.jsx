import './index.scss';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Modal } from 'antd';
import ApplicationConfig from '../../../ApplicationConfig';
import { WalletConfig } from './WalletConfig';
import { useEthers } from '@usedapp/core';
import WebThreeContext from '../../WebThreeProvider/WebThreeContext';

const WalletSelector = ({ isOpen, onClose }) => {
    const { activateBrowserWallet, deactivate } = useEthers();
    const web3Context = useContext(WebThreeContext);

    const [isCheckboxChecked, checkboxChecked] = useState(false);
    const [hoverWallet, setHoverWallet] = useState('injected');
    const [lastWallet, setLastWallet] = useState('injected');

    const enableWallets = useMemo(() => {
        let wallets = WalletConfig.filter((config) => {
            if (config.enable) {
                return config.enable();
            }

            return true;
        });
        return wallets;
    }, [window.ethereum, window.okxwallet]);

    const checked = () => {
        let _isCheckboxChecked = !isCheckboxChecked;
        checkboxChecked(_isCheckboxChecked);
        if (window.localStorage) {
            window.localStorage.setItem('CONNECT_WALLET_CHECKBOX_CHECKED', `${_isCheckboxChecked}`);
        }
    };

    const checkTxtClick = (event) => {
        event.stopPropagation();
    };

    const onHover = (connector) => {};

    const connectWallet = (connector, wallet) => {
        console.debug(`connect with `, wallet);

        if (window.localStorage) {
            window.localStorage.setItem('CURRENT_WALLET_NAME', wallet);
            window.localStorage.setItem('CURRENT_WALLET_CONNECTED', 'true');
        }

        if (connector === 'injected' && (window.ethereum || window.okxwallet)) {
            let activeWallet = wallet === 'OKX wallet' ? 'okx' : 'metamask';
            activateBrowserWallet({ type: activeWallet });
        } else {
            activateBrowserWallet({ type: 'walletConnect' });
        }
    };

    const disconnect = (event) => {
        event.stopPropagation();
        deactivate();
        if (window.localStorage) {
            window.localStorage.setItem('CURRENT_WALLET_CONNECTED', 'false');
        }
    };

    useEffect(() => {
        if (window.localStorage) {
            let _isCheckboxChecked = window.localStorage.getItem('CONNECT_WALLET_CHECKBOX_CHECKED') === 'true';
            checkboxChecked(_isCheckboxChecked);

            let _lastWallet = window.localStorage.getItem('CURRENT_WALLET') || 'injected';
            setLastWallet(_lastWallet);

            let _lastWalletName = window.localStorage.getItem('CURRENT_WALLET_NAME') || 'MetaMask';
            let _lastWalletDisconnected = window.localStorage.getItem('CURRENT_WALLET_CONNECTED') || 'false';
            console.debug(
                `LastConnectedWallet => `,
                _lastWalletName,
                `_lastWalletDisconnected => `,
                _lastWalletDisconnected,
            );
            if (_lastWalletName === 'OKX wallet' && _lastWalletDisconnected === 'true') {
                console.debug(`connect to okx automatically.`);
                activateBrowserWallet({ type: 'okx' });
            }
        }
    }, [window.ethereum, window.okxwallet]);

    return (
        <Modal
            title=""
            footer={null}
            open={isOpen}
            width={ApplicationConfig.popupWindowWidth}
            onCancel={onClose}
            className={'overlay_container common_modal wallet_selector'}
        >
            <div className={`pop_wallet_box ${isCheckboxChecked ? 'wallet_items_enable' : 'wallet_items_disable'}`}>
                <div className={'wallet_title'}>Connect your wallet</div>
                <div className={'f_r_l_t wallet_title_s'}>
                    <div
                        className={`${isCheckboxChecked ? 'wallet_checkbox_checked' : 'wallet_checkbox'}`}
                        onClick={checked}
                    />
                    <div onClick={checked}>
                        By connecting my wallet I agree to the{' '}
                        <a
                            href="#"
                            target={'_blank'}
                            className={'link'}
                            onClick={checkTxtClick}
                        >
                            Terms of Use
                        </a>{' '}
                        and{' '}
                        <a
                            href="#"
                            target={'_blank'}
                            className={'link'}
                            onClick={checkTxtClick}
                        >
                            Privacy Policy
                        </a>
                        .
                    </div>
                </div>
                {enableWallets.map((wallet) => (
                    <div key={wallet.name} className={'w_100'}>
                        {isCheckboxChecked ? (
                            <div
                                className={`wallet_item ${hoverWallet === wallet.name ? 'wallet_item_active' : ''}`}
                                onClick={() => {
                                    connectWallet(wallet.connector, wallet.name);
                                }}
                                onMouseOver={onHover(wallet.name)}
                            >
                                <div className={'f_r_l'}>
                                    <div className={`i_icon_24 ${wallet.icon}`} />
                                    <div className={'wallet_name'}>{wallet.name}</div>
                                </div>
                                {web3Context?.account && lastWallet === wallet.connector && (
                                    <div className={'f_r_l disconnect_box'} onClick={disconnect}>
                                        <div className={'disconnect_dot'} />
                                        <div className={'disconnect'}>Disconnect</div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={`wallet_item`}>
                                <div className={'f_r_l'}>
                                    <div className={`i_icon_24 wallet_logo ${wallet.icon}`} />
                                    <div className={'wallet_name'}>{wallet.name}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default WalletSelector;
