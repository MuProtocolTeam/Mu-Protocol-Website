import './index.scss';
import DefaultLogo from './img/token_default.svg';
import React from 'react';

const CoinIcon = ({ logo }) => {
    return <div className={'coin_icon'} style={{ backgroundImage: `url(${logo ? logo : DefaultLogo})` }}></div>;
};

export default CoinIcon;
