import * as React from 'react';

import './index.scss';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Modal } from 'antd';
import ErrorIcon from './img/error.svg';
import ApplicationConfig from '../../../../../ApplicationConfig';
import { DefaultChain } from '../../../../../contract/ChainConfig';

const ChangeNetworkDialog = ({ isOpen, onClose, account, onSwitchNetwrok, web3Context }) => {
    return (
        <Modal
            title=""
            footer={null}
            open={isOpen}
            width={ApplicationConfig.popupWindowWidth}
            onCancel={onClose}
            closable={true}
            className={'overlay_container common_modal '}
            bodyStyle={{ padding: '20px' }}
        >
            <div className={'network_change_container'}>
                <img className={'error_circle_container'} src={ErrorIcon} />
                <div className={'title'}>Unsupported network</div>
                <div className={'user_info_container'}>
                    <div className={'f_r_l account_address_wrapper'}>
                        <div className={'account_photo'}>
                            <Jazzicon diameter={24} seed={jsNumberForAddress(account)} />
                        </div>
                        <div className={'f_r_l account'}>
                            <div className={'add'}>{web3Context?.summaryAccount}</div>
                        </div>
                        <div className={'f_r_l network_box'}>
                            <div className={'dot'} />
                            <div>{`${'Unsupported chain'} (${account ? 'Connected' : 'Not Connected'})`}</div>
                        </div>
                    </div>
                </div>
                <div className={'footer'}>
                    <div className={'w_300'}>
                        <p
                            style={{ marginTop: '20px' }}
                        >{`We've detected that you need to switch your wallet's network to ${DefaultChain.chainName} for this DApp.`}</p>
                        <div
                            className={'switch_btn'}
                            onClick={onSwitchNetwrok}
                        >{`Switch to ${DefaultChain.chainName}`}</div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default ChangeNetworkDialog;
