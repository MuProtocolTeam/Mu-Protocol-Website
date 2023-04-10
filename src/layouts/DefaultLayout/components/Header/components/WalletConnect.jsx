import React, { useContext, useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import WebThreeContext from '../../../../../components/WebThreeProvider/WebThreeContext';
import ConditionDisplay from '../../../../../components/ConditionDisplay';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import CopyAddress from '../../../../../components/CopyAddress';
import ViewOnEtherscan from '../../../../../components/ViewOnEtherscan';
import ContractConfig from '../../../../../contract/ContractConfig';
import ChangeNetworkDialog from './ChangeNetworkDialog';
import ApplicationConfig from '../../../../../ApplicationConfig';
import NoProviderDialog from './NoProviderDialog';
import ConnectWalletBtn from '../../../../../components/ConnectWalletBtn';
import { ConnectButton } from "@mysten/wallet-kit";

const WalletConnect = () => {
    const { deactivate, error, switchNetwork } = useEthers();
    const web3Context = useContext(WebThreeContext);
    const [isOpenSwitchNetwork, setOpenSwitchNetwork] = useState(false);
    const [isOpenNoProvider, setOpenNoProvider] = useState(false);

    const onSwitchNetwrok = async () => {
        let chainId = ApplicationConfig.defaultChain.chainId;
        await switchNetwork(chainId);
        setOpenSwitchNetwork(false);
    };

    const handleError = (e) => {
        console.error(`network error: error => ${e}, message => ${e?.message}`);

        if (e && e.message.includes('Not configured chain id')) {
            setOpenSwitchNetwork(true);
        } else if (e && e.message === 'No injected provider available') {
            setOpenNoProvider(true);
        }
    };

    useEffect(() => {
        if (error) {
            handleError(error);
        }
    }, [error]);

    return (
        <div className="f_r_l wallet_connect_btn_box">
            <div className="hidden lg:block">
                <ConditionDisplay display={web3Context.account}>
                    <div className={'f_r_l c account_network_box'}>
                        <div className={'f_r_l account_address_wrapper'}>
                            <div className={'f_r_l account_box'}>
                                <div className={'account_photo'}>
                                    <Jazzicon diameter={24} seed={jsNumberForAddress(web3Context.account)} />
                                </div>
                                <div className={'f_r_l account'}>
                                    <div className={'add'}>{web3Context.summaryAccount}</div>

                                    {/* <LoadTransactionStatusTips /> */}
                                </div>
                            </div>

                            <div className={'f_r_l network_box'}>
                                <div className={'nw_icon'}></div>
                                <div className={'nw_name'}>{web3Context.chainName}</div>
                            </div>
                        </div>
                    </div>
                </ConditionDisplay>
            </div>

            <ConditionDisplay display={!web3Context.account}>
                <ConnectButton className={`text_center sub_btn_long sub_btn_long_default w-full`} />
            </ConditionDisplay>

            <NoProviderDialog isOpen={isOpenNoProvider} onClose={() => setOpenNoProvider(false)} />
        </div>
    );
};
export default WalletConnect;
