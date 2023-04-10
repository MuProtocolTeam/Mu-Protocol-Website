import React from 'react';
import DefaultLogo from '../Coin/img/token_default.svg';
import { DefaultChain } from '../../contract/ChainConfig';
import { WrappedTokens } from '../../contract/TokenContract';

export class ERCToken {
    chainId = 0;
    address = '';
    currentMarketPrice = '';
    name = '';
    symbol = '';
    logoURI = DefaultLogo;
    decimals = 18;
    native = false;
    localName = '';

    constructor({ chainId, address, name, symbol, logoURI, decimals, currentMarketPrice, localName, native = false }) {
        this.chainId = chainId || DefaultChain.chainId;
        this.address = address;
        this.name = name;
        this.symbol = symbol;
        this.logoURI = logoURI;
        this.decimals = decimals;
        this.currentMarketPrice = currentMarketPrice;
        this.native = native;
        this.localName = localName ?? symbol;
    }

    updateCurrentPrice(currentMarketPrice) {
        this.currentMarketPrice = currentMarketPrice;
    }

    toNative(native, updateLogo) {
        this.native = native;

        let handler = this;
        let filter = WrappedTokens.filter((wrappedToken) => {
            return wrappedToken.wrappedName === handler.symbol;
        });
        if (filter.length) {
            let wrappedToken = filter[0];
            this.localName = native ? wrappedToken.nativeName : wrappedToken.wrappedName;
            if (updateLogo) {
                this.logoURI = native ? wrappedToken.nativeLogo : wrappedToken.wrappedLogo;
            }
        }
    }
}
