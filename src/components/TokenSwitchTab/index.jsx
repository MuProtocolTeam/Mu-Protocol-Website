import React from 'react';
import './index.scss';

const TokenSwitchTab = ({ tabTokenA, tabTokenB, activeTokenAddress, onSwitch }) => {
    return (
        <div className="token_switch_tab_wrapper">
            <div
                className={`token_switch_tab ${
                    activeTokenAddress === tabTokenA?.address ? 'token_switch_tab_active' : ''
                }`}
                onClick={onSwitch && onSwitch('tokenA')}
            >
                {tabTokenA?.symbol}
            </div>
            <div
                className={`token_switch_tab ${
                    activeTokenAddress === tabTokenB?.address ? 'token_switch_tab_active' : ''
                }`}
                onClick={onSwitch && onSwitch('tokenB')}
            >
                {tabTokenB?.symbol}
            </div>
        </div>
    );
};

export default TokenSwitchTab;
